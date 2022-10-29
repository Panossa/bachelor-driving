import {Circumstance} from './circumstance';
import {DoAnswer} from './enums/do-answer.enum';
import {GridPosition} from './enums/grid-position.enum';
import {mapGridPositionsToTurnSignal} from './enums/turn-signal.enum';
import {RoadSide} from './enums/road-side.enum';
import {TrafficSubject} from './traffic-subject';
import {TrafficSubjectTypes} from './enums/traffic-subject-type.enum';
import {STREET_LAYOUTS, StreetLayout} from './street-layout';
import {getRandomPropertyOfObject} from '../utils/object-utils';
import {getRandomObjectOfArray} from '../utils/array-utils';

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
		// Clamp difficulty if needed.
		difficulty = Math.min(difficulty, 3);

		// Define which type of road we're dealing with, from a list of possible ones.
		this.streetLayout = getRandomPropertyOfObject(STREET_LAYOUTS);

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
		}

		// Define at least one circumstance, up to 2 depending on the skill level.
		// The upper limit can be higher if enough base circumstances are defined,
		// as to not create a situation where 3 too similar circumstances are mixed.
		const circumstanceCount = Math.random() > 0.5 ? 1 : 2; // TODO make this use difficulty
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
