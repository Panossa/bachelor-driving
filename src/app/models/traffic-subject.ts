import {TrafficSubjectTypes} from './enums/traffic-subject-type.enum';
import {GridPosition} from './enums/grid-position.enum';
import {RoadSide} from './enums/road-side.enum';
import {TurnSignal} from './enums/turn-signal.enum';

export class TrafficSubject {
	readonly type: TrafficSubjectTypes;
	readonly gridPosition: GridPosition;
	readonly orientation: RoadSide;
	readonly turnSignal: TurnSignal;
	// readonly braking;
	// readonly rotation; possible addition for when a car is at the center and needs to go right/left

	constructor(type: TrafficSubjectTypes, location: GridPosition, orientation: RoadSide, turnSignal: TurnSignal) {
		this.type = type;
		this.gridPosition = location;
		this.orientation = orientation;
		this.turnSignal = turnSignal;
	}
}
