import {TrafficSubject} from './traffic-subject';
import {CIRCUMSTANCE_LIST} from './demo-data';
import {getRandomIntFromInterval} from '../utils/number-utils';
import {GridPosition} from './enums/grid-position.enum';
import {RoadSide} from './enums/road-side.enum';
import {TrafficSubjectTypes} from './enums/traffic-subject-type.enum';
import {mapGridPositionsToTurnSignal, TurnSignal} from './enums/turn-signal.enum';
import {getRandomObjectOfArray} from '../utils/array-utils';

export class Circumstance {
	readonly id: string; // mostly (subject/object) (current position) [destination]. E.g. CAR_FROM_RIGHT_TO_THEIR_LEFT
	readonly trafficSubjects: TrafficSubject[];
	// readonly trafficHazards etc. could be added here.

	constructor(hasRoadForward: boolean, hasRoadLeft: boolean, hasRoadRight: boolean, gridPosition: GridPosition) {
		this.id = String(Math.random()).substring(2,5);

		// Find out which direction a subject wants to go in
		// Collect all possible directions
		const possibleTurnSignals: TurnSignal[] = [];
		// A subject can only go to the top if (1) there is a top road and (2) it's not on the top, itself.
		if (hasRoadForward && gridPosition !== GridPosition.TOP) {
			possibleTurnSignals.push(mapGridPositionsToTurnSignal(gridPosition, GridPosition.TOP));
		}
		if (hasRoadLeft && gridPosition !== GridPosition.LEFT) {
			possibleTurnSignals.push(mapGridPositionsToTurnSignal(gridPosition, GridPosition.LEFT));
		}
		if (hasRoadRight && gridPosition !== GridPosition.RIGHT) {
			possibleTurnSignals.push(mapGridPositionsToTurnSignal(gridPosition, GridPosition.RIGHT))
		}
		// All subjects from all sides can drive towards the user's street.
		possibleTurnSignals.push(mapGridPositionsToTurnSignal(gridPosition, GridPosition.BOTTOM));

		const turnSignal = getRandomObjectOfArray(possibleTurnSignals);

		this.trafficSubjects = [{
			type: TrafficSubjectTypes.CAR,
			gridPosition: gridPosition,
			orientation: RoadSide.OPPOSITE_DIRECTION,
			turnSignal: turnSignal
		}];
	}

	static generateDemoCircumstance(): Circumstance {
		const circData = CIRCUMSTANCE_LIST[getRandomIntFromInterval(0, CIRCUMSTANCE_LIST.length-1)];
		return {
			id: circData.id,
			trafficSubjects: circData.trafficSubjects
		};
	}
}
