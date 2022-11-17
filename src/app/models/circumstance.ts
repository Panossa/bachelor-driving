import {TrafficSubject} from './traffic-subject';
import {CIRCUMSTANCE_LIST} from './demo-data';
import {getRandomIntFromInterval} from '../utils/number-utils';
import {GridPosition} from './enums/grid-position.enum';
import {RoadSide} from './enums/road-side.enum';
import {TrafficSubjectTypes} from './enums/traffic-subject-type.enum';
import {mapGridPositionsToTurnSignal, TurnSignal} from './enums/turn-signal.enum';
import {getRandomObjectOfArray} from '../utils/array-utils';
import {SubjectColor} from './subject-colors';

export class Circumstance {
	readonly id: string; // mostly (subject/object) (current position) [destination]. E.g. CAR_FROM_RIGHT_TO_THEIR_LEFT
	readonly trafficSubjects: TrafficSubject[];
	// readonly trafficHazards etc. could be added here.

	/**
	 * Constructor for anything except a straight road.
	 */
	static generateForCrossing(hasRoadForward: boolean, hasRoadLeft: boolean, hasRoadRight: boolean, gridPosition: GridPosition, subjectColor: SubjectColor): Circumstance {
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

		return {
			id: String(Math.random()).substring(2,5),
			trafficSubjects: [{
				type: TrafficSubjectTypes.CAR,
				gridPosition: gridPosition,
				orientation: RoadSide.OPPOSITE_DIRECTION,
				turnSignal: turnSignal,
				baseColor: subjectColor
			}]
		};
	}

	/**
	 * Constructor for a straight road.
	 */
	static generateForStraightRoad(gridPosition: GridPosition, roadSide: RoadSide, subjectColor: SubjectColor): Circumstance {
		return {
			id: String(Math.random()).substring(2,5),
			trafficSubjects: [{
				type: TrafficSubjectTypes.CAR,
				gridPosition: gridPosition,
				orientation: roadSide,
				turnSignal: TurnSignal.NONE, // This can be randomly generated as BOTH in the future.
				baseColor: subjectColor
			}]
		}
	}

	static generateDemoCircumstance(): Circumstance {
		const circData = CIRCUMSTANCE_LIST[getRandomIntFromInterval(0, CIRCUMSTANCE_LIST.length-1)];
		return {
			id: circData.id,
			trafficSubjects: circData.trafficSubjects
		};
	}
}
