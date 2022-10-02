import {GridPosition} from '../models/enums/grid-position.enum';
import {TrafficSubject} from '../models/traffic-subject';
import {Circumstance} from '../models/circumstance';

/**
 * Used in filter() methods to only return subjects who have no one on their right on the grid.
 */
export function haveNoneOnTheirRightFilter(subject: TrafficSubject, index: number, array: TrafficSubject[]) {
	switch (subject.gridPosition) {
		// TODO change to cyclic doubly linked list?
		case GridPosition.BOTTOM:
			// nobody on the right?
			return !!array.find(otherSubject => otherSubject.gridPosition === GridPosition.RIGHT);
		case GridPosition.LEFT:
			// nobody on the bottom?
			return !!array.find(otherSubject => otherSubject.gridPosition === GridPosition.BOTTOM);
		case GridPosition.RIGHT:
			// nobody on the top?
			return !!array.find(otherSubject => otherSubject.gridPosition === GridPosition.TOP);
		case GridPosition.TOP:
			// nobody on the left?
			return !!array.find(otherSubject => otherSubject.gridPosition === GridPosition.LEFT);
		default:
			console.error('Invalid grid position of traffic subject! Index ' + index + ' of ' + array);
	}
}

/**
 * Calculates road counts used in the circumstance array. Counts +1 for the "back" road the user is on.
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
