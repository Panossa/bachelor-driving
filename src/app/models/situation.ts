import {Circumstance} from './circumstance';
import {DoAnswer} from './enums/do-answer.enum';
import {GridPosition} from './enums/grid-position.enum';
import {mapGridPositionsToTurnSignal} from './enums/turn-signal.enum';
import {RoadSide} from './enums/road-side.enum';
import {TrafficSubject} from './traffic-subject';
import {TrafficSubjectTypes} from './enums/traffic-subject-type.enum';
import {STREET_LAYOUTS, StreetLayout} from './street-layout';
import {getRandomObjectOfArray} from '../utils/array-utils';
import {clamp, getRandomDoubleFromInterval} from '../utils/number-utils';
import {getWeightedRandomElement, WeightedObject} from '../utils/random-utils';
import {SubjectColor, SubjectColors} from './subject-colors';

export class Situation {

	// The user's car
	readonly oneself: TrafficSubject;
	// Relevant traffic subjects other than the user.
	readonly trafficSubjects: TrafficSubject[] = [];
	readonly streetLayout: StreetLayout;

	// must be max. 3. Upgrade for other types of questions to: DoAnswer[] | CheckAnswer[] etc.:
	// Possible answers are dependent on the highest active rule set (e.g. traffic lights) and set from outside.
	answers: DoAnswer[];
	// set from outside as this is dependent on outside data:
	correctAnswers: DoAnswer[];

	private readonly possibleSubjectColors: SubjectColor[];

	// Creates a random situation
	constructor(difficulty: number) {
		// Clamp difficulty if needed. Currently only 1.3 are supported.
		difficulty = clamp(difficulty, 1, 3);

		// Define which type of road we're dealing with, from a list of possible ones.
		this.streetLayout = getWeightedRandomElement([
			// Straight roads have a completely different rule set.
			new WeightedObject(STREET_LAYOUTS.STRAIGHT_ROAD, 1),
			// The higher the difficulty the more full crossings are generated. This happens based on the expectancy full crossings are more difficult.
			new WeightedObject(STREET_LAYOUTS.FULL_CROSSING, difficulty*2),
			new WeightedObject(STREET_LAYOUTS.T_CROSSING_RIGHT_FORWARD, 1),
			new WeightedObject(STREET_LAYOUTS.T_CROSSING_LEFT_FORWARD, 1),
			new WeightedObject(STREET_LAYOUTS.T_CROSSING_LEFT_RIGHT, 1),
		]).object;

		// Define where the user needs to drive
		const possibleTargetGridPositions: GridPosition[] = [];
		if (this.streetLayout.hasRoadRight) {
			possibleTargetGridPositions.push(GridPosition.RIGHT);
		}
		if (this.streetLayout.hasRoadLeft) {
			possibleTargetGridPositions.push(GridPosition.LEFT);
		}
		if (this.streetLayout.hasRoadForward) {
			possibleTargetGridPositions.push(GridPosition.TOP);
		}

		let possibleSubjectGridPositions = [];
		if (this.streetLayout === STREET_LAYOUTS.STRAIGHT_ROAD) {
			// One possible grid position is missing: BOTTOM + OPPOSITE_DIRECTION, which is the user itself. See oneself for more info.
			// Another is missing: CENTER + TRAVEL_DIRECTION. Because that one is mandatory (for now!) and will be added anyway.
			possibleSubjectGridPositions = [
				{gridPosition: GridPosition.TOP, roadSide: RoadSide.TRAVEL_DIRECTION},
				{gridPosition: GridPosition.TOP, roadSide: RoadSide.OPPOSITE_DIRECTION},
				{gridPosition: GridPosition.CENTER, roadSide: RoadSide.OPPOSITE_DIRECTION},
				{gridPosition: GridPosition.BOTTOM, roadSide: RoadSide.TRAVEL_DIRECTION}
			];
		} else {
			// Since there can only be cars on the opposite side of a crossing, it's okay to just copy the data here.
			possibleTargetGridPositions.forEach(pos => possibleSubjectGridPositions.push({gridPosition: pos, roadSide: RoadSide.OPPOSITE_DIRECTION}));
		}

		this.oneself = {
			type: TrafficSubjectTypes.CAR,
			// viewed from a central perspective, the user is on the opposite driving direction for everyone involved
			orientation: RoadSide.OPPOSITE_DIRECTION,
			gridPosition: GridPosition.BOTTOM,
			turnSignal: mapGridPositionsToTurnSignal(GridPosition.BOTTOM, getRandomObjectOfArray(possibleTargetGridPositions)),
			baseColor: SubjectColors.WHITE
		};

		// Define at least one circumstance, up to a circumstance per street (e.g. 3 cars on 3 possible roads).
		// The upper limit can be higher if enough circumstance types are defined,
		// as to not create a situation where 3 too similar circumstances are mixed. However, for now, cars are the only type.
		// Currently, this generates at max 3 cars for 3 roads if difficulty is 3. Trying not to ALWAYS generate max. amount of cars.
		const circumstanceCount = Math.round(clamp(getRandomDoubleFromInterval(0.5, 1.5) * difficulty * 0.8, 1, possibleSubjectGridPositions.length));
		console.log(`Generating ${circumstanceCount} circumstances.`);
		const circumstances: Circumstance[] = [];

		// Generate list of possible colors for other subjects. First, get all properties of the Colors object...
		this.possibleSubjectColors = Object.getOwnPropertyNames(SubjectColors)
			// ...then filter out default JavaScript properties like length as well as the color WHITE as it's reserved for the user...
			.filter(propertyName => !["length", "name", "prototype", "WHITE"].includes(propertyName))
			// ...then map all property names back to the actual properties.
			.map(propertyName => SubjectColors[propertyName]);

		// In case we're on a straight road, other subjects can spawn anywhere along the road except in the spot where the user is.
		if (this.streetLayout === STREET_LAYOUTS.STRAIGHT_ROAD) {
			// This part ignores previous possibleGridPositions as it works on a different basis, taking into account roadside and knowing all gridPositions.
			// This can surely be automated in a future revision.
			// Overriding variable name for new purpose but same meaning.

			// Hardcode a car in front of the user
			circumstances.push(Circumstance.generateForStraightRoad(GridPosition.CENTER, RoadSide.TRAVEL_DIRECTION, this.getPossibleSubjectColor()));

			// Starting generation of more cars with 1 since we already added the obligatory one.
			for (let i = 1; i < circumstanceCount; i++) {
				const position = getRandomObjectOfArray(possibleSubjectGridPositions);
				circumstances.push(Circumstance.generateForStraightRoad(position.gridPosition, position.roadSide, this.getPossibleSubjectColor()));
				possibleSubjectGridPositions.splice(possibleSubjectGridPositions.indexOf(position), 1);
			}
		} else {
			for (let circumstanceIndex = 0; circumstanceIndex < circumstanceCount && possibleTargetGridPositions.length > 0; circumstanceIndex++) {
				const gridPositionOfCar = getRandomObjectOfArray(possibleTargetGridPositions);
				circumstances.push(Circumstance.generateForCrossing(this.streetLayout.hasRoadForward, this.streetLayout.hasRoadLeft, this.streetLayout.hasRoadRight, gridPositionOfCar, this.getPossibleSubjectColor()));
				// Remove the grid position where a subject just spawned from the list of possible positions
				possibleTargetGridPositions.splice(possibleTargetGridPositions.indexOf(gridPositionOfCar), 1);
			}
		}

		// Aggregating trafficSubjects into one array.
		circumstances.forEach(circumstance =>
			// Currently only one subject per circumstance is generated.
			this.trafficSubjects.push(circumstance.trafficSubjects[0]));

		console.log(`Generated situation: ${JSON.stringify(this)}`);
	}

	private getPossibleSubjectColor(): SubjectColor {
		const colorOfCar = getRandomObjectOfArray(this.possibleSubjectColors);
		// Remove the color from possible colors
		this.possibleSubjectColors.splice(this.possibleSubjectColors.indexOf(colorOfCar), 1);
		return colorOfCar;
	}

}
