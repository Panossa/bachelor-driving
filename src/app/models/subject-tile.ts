import {TrafficSubject} from './traffic-subject';
import {GridPosition} from './enums/grid-position.enum';

export class SubjectTile {

	/**
	 * When on a vertical (top, center, bottom) this is the subject on the LEFT.
	 * When on a horizontal - on TOP.
	 */
	trafficSubject1: TrafficSubject;

	/**
	 * When on a vertical (top, center, bottom) this is the subject on the RIGHT.
	 * When on a horizontal - on BOTTOM.
	 */
	trafficSubject2: TrafficSubject;

	constructor(trafficSubject1: TrafficSubject, trafficSubject2: TrafficSubject) {
		this.trafficSubject1 = trafficSubject1;
		this.trafficSubject2 = trafficSubject2;
	}

	get gridPosition(): GridPosition {
		// One of those must be set.
		// Can't be put on one line like return this.TS1.gridPos || this.TS2.gridPos because gridPos[0] == TOP would be converted to boolean instead of GridPos.
		if (this.trafficSubject1) {
			return this.trafficSubject1.gridPosition;
		} else {
			return this.trafficSubject2.gridPosition;
		}
	}

	/**
	 * Returns whether this tile has no subjects.
	 */
	isEmpty(): boolean {
		return this.trafficSubject1 == null && this.trafficSubject2 == null;
	}

	static createEmpty(): SubjectTile {
		return new SubjectTile(null, null);
	}
}
