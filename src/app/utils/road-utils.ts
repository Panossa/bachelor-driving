import {GridPosition} from '../models/enums/grid-position.enum';
import {TrafficSubject} from '../models/traffic-subject';
import {Circumstance} from '../models/circumstance';
import {TurnSignals} from '../models/enums/turn-signal.enum';

/**
 * Used in filter() methods to only return subjects who have no one on their right on the grid.
 * @param subject the subject to test with/as
 * @param remainingTrafficSubjects a reference to all remaining traffic subjects on the street
 */
export function haveNoneOnTheirRightFilter(subject: TrafficSubject, remainingTrafficSubjects: TrafficSubject[]): boolean {
	console.log(`checking onTheirRight for ${JSON.stringify(subject)}`);
	switch (subject.gridPosition) {
		case GridPosition.BOTTOM:
			console.log('on bottom. checking right');
			// nobody on the right?
			console.log(`on right: ${JSON.stringify(remainingTrafficSubjects.find(otherSubject => {
				console.log(JSON.stringify(otherSubject));
				return otherSubject.gridPosition === GridPosition.RIGHT;
			}))}`);
			return !remainingTrafficSubjects.find(otherSubject => otherSubject.gridPosition === GridPosition.RIGHT);
		case GridPosition.LEFT:
			console.log('on left. checking bottom');
			// nobody on the bottom?
			return !remainingTrafficSubjects.find(otherSubject => otherSubject.gridPosition === GridPosition.BOTTOM);
		case GridPosition.RIGHT:
			console.log('on right. checking top');
			// nobody on the top?
			return !remainingTrafficSubjects.find(otherSubject => otherSubject.gridPosition === GridPosition.TOP);
		case GridPosition.TOP:
			console.log('on top. checking left');
			// nobody on the left?
			return !remainingTrafficSubjects.find(otherSubject => otherSubject.gridPosition === GridPosition.LEFT);
		default:
			console.error(`Invalid grid position of traffic subject ${subject} ! Of ${remainingTrafficSubjects}`);
	}
}

export function haveNoneOnOppositeSiteWhoWantToDriveForward(subject: TrafficSubject, remainingTrafficSubjects: TrafficSubject[]): boolean {
	console.log(`Traffic subject: ${JSON.stringify(subject)} is on grid position ${subject.gridPosition}`);
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
export function calculateRoadCount(circumstances: Circumstance[]): number {
	const roads = {
		needsRoadRight: false,
		needsRoadLeft: false,
		needsRoadForward: false
	};
	circumstances.forEach(circ => {
		roads.needsRoadRight = roads.needsRoadRight || circ.needsRoadRight;
		roads.needsRoadLeft = roads.needsRoadLeft || circ.needsRoadLeft;
		roads.needsRoadForward = roads.needsRoadForward || circ.needsRoadForward;
	})
	// Count roads set to true + 1 for the road the user is on.
	return Number(roads.needsRoadRight) + Number(roads.needsRoadLeft) + Number(roads.needsRoadForward) + 1;
}
