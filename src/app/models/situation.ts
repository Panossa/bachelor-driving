import {Circumstance} from './circumstance';
import {DoAnswer} from './enums/do-answer.enum';
import {GridPosition} from './enums/grid-position.enum';
import {mapGridPositionsToTurnSignal} from './enums/turn-signal.enum';
import {RoadSide} from './enums/road-side.enum';
import {TrafficSubject} from './traffic-subject';
import {TrafficSubjectTypes} from './enums/traffic-subject-type.enum';
import {STREET_LAYOUTS, StreetLayout} from './street-layout';
import {getRandomObjectOfArray} from '../utils/array-utils';
import {clamp} from '../utils/number-utils';
import {getWeightedRandomElement, WeightedObject} from '../utils/random-utils';

export class Situation {

	readonly oneself: TrafficSubject;
	readonly streetLayout: StreetLayout;

	/**
	 * Relevant traffic subjects other than the user.
	 */
	trafficSubjects: TrafficSubject[] = [];

	// must be max. 3. Upgrade for other types of questions to: DoAnswer[] | CheckAnswer[] etc.:
	// Possible answers are dependent on the highest active rule set (e.g. traffic lights) and set from outside.
	answers: DoAnswer[];
	// set from outside as this is dependent on outside data:
	correctAnswers: DoAnswer[];

	// Creates a random situation
	constructor(difficulty: number) {
		// Clamp difficulty if needed. Currently only 1.3 are supported.
		difficulty = clamp(difficulty, 1, 3);

		// Define which type of road we're dealing with, from a list of possible ones.
		this.streetLayout = getWeightedRandomElement([
			// Straight roads are currently not supported. TODO
			new WeightedObject(STREET_LAYOUTS.STRAIGHT_ROAD, 0),
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

		this.oneself = {
			type: TrafficSubjectTypes.CAR,
			// viewed from a central perspective, the user is on the opposite driving direction for everyone involved
			orientation: RoadSide.OPPOSITE_DIRECTION,
			gridPosition: GridPosition.BOTTOM,
			turnSignal: mapGridPositionsToTurnSignal(GridPosition.BOTTOM, getRandomObjectOfArray(possibleTargetGridPositions))
		};

		// Define at least one circumstance, up to a circumstance per street (e.g. 3 cars on 3 possible roads).
		// The upper limit can be higher if enough circumstance types are defined,
		// as to not create a situation where 3 too similar circumstances are mixed. However, for now, cars are the only type.
		// Currently, this generates at max 3 cars for 3 roads if difficulty is 3. Trying not to ALWAYS generate max. amount of cars.
		const circumstanceCount = Math.round(clamp(difficulty * 0.8, 1, possibleTargetGridPositions.length));
		console.log(`Generating ${circumstanceCount} circumstances.`);
		const circumstances: Circumstance[] = [];
		for (let circumstanceIndex = 0; circumstanceIndex < circumstanceCount && possibleTargetGridPositions.length > 0; circumstanceIndex++) {
			const gridPositionOfCar = getRandomObjectOfArray(possibleTargetGridPositions);
			circumstances.push(new Circumstance(this.streetLayout.hasRoadForward, this.streetLayout.hasRoadLeft, this.streetLayout.hasRoadRight, gridPositionOfCar));
			// Remove the grid position where a subject just spawned from the list of possible positions
			possibleTargetGridPositions.splice(possibleTargetGridPositions.indexOf(gridPositionOfCar), 1);
		}

		// Aggregating trafficSubjects into one array.
		circumstances.forEach(circumstance =>
			// Currently only one subject per circumstance is generated.
			this.trafficSubjects.push(circumstance.trafficSubjects[0]));
	}

}
