import {GridPosition} from '../models/enums/grid-position.enum';
import {TrafficSubject} from '../models/traffic-subject';
import {TurnSignals} from '../models/enums/turn-signal.enum';
import {Situation} from '../models/situation';
import {Tile} from '../models/tile';

/**
 * Used in filter() methods to only return subjects who have no one on their right on the grid.
 * @param subject the subject to test with/as
 * @param remainingTrafficSubjects a reference to all remaining traffic subjects on the street
 */
export function haveNoneOnTheirRightFilter(subject: TrafficSubject, remainingTrafficSubjects: TrafficSubject[]): boolean {
	switch (subject.gridPosition) {
		case GridPosition.BOTTOM:
			// nobody on the right?
			return !remainingTrafficSubjects.find(otherSubject => otherSubject.gridPosition === GridPosition.RIGHT);
		case GridPosition.LEFT:
			// nobody on the bottom?
			return !remainingTrafficSubjects.find(otherSubject => otherSubject.gridPosition === GridPosition.BOTTOM);
		case GridPosition.RIGHT:
			// nobody on the top?
			return !remainingTrafficSubjects.find(otherSubject => otherSubject.gridPosition === GridPosition.TOP);
		case GridPosition.TOP:
			// nobody on the left?
			return !remainingTrafficSubjects.find(otherSubject => otherSubject.gridPosition === GridPosition.LEFT);
		default:
			console.error(`Invalid grid position of traffic subject ${subject} ! Of ${remainingTrafficSubjects}`);
	}
}

export function haveNoneOnOppositeSiteWhoWantToDriveForward(subject: TrafficSubject, remainingTrafficSubjects: TrafficSubject[]): boolean {
	switch (subject.gridPosition) {
		case GridPosition.RIGHT:
			return !remainingTrafficSubjects.find(otherSubject =>
				otherSubject.gridPosition === GridPosition.LEFT
				&& otherSubject.turnSignal === TurnSignals.NONE
			);
		case GridPosition.BOTTOM:
			return !remainingTrafficSubjects.find(otherSubject =>
				otherSubject.gridPosition === GridPosition.TOP
				&& otherSubject.turnSignal === TurnSignals.NONE
			);
		case GridPosition.LEFT:
			return !remainingTrafficSubjects.find(otherSubject =>
				otherSubject.gridPosition === GridPosition.RIGHT
				&& otherSubject.turnSignal === TurnSignals.NONE
			);
		case GridPosition.TOP:
			return !remainingTrafficSubjects.find(otherSubject =>
				otherSubject.gridPosition === GridPosition.BOTTOM
				&& otherSubject.turnSignal === TurnSignals.NONE
			);
		default:
			console.error(`Invalid grid position of traffic subject ${subject}`);
	}
}

/**
 * Calculates road counts used in the circumstance array. Counts +1 for the 'back' road the user is on.
 */
export function calculateRoadCount(situation: Situation): number {
	// Count roads set to true + 1 for the road the user is on.
	return Number(situation.needsRoadRight) + Number(situation.needsRoadLeft) + Number(situation.needsRoadForward) + 1;
}


export function generateRoadTiles(situation: Situation): Tile[] {
	if (situation.needsRoadForward && !situation.needsRoadRight && !situation.needsRoadLeft) {
		// return straight road
		return [

		];
	}
	return null;
}
