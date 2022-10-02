import {TrafficSubjectTypes} from './enums/traffic-subject-type.enum';
import {GridPosition} from './enums/grid-position.enum';
import {RoadSide} from './enums/road-side.enum';
import {TurnSignals} from './enums/turn-signal.enum';

export class TrafficSubject {
	readonly type: TrafficSubjectTypes;
	readonly gridPosition: GridPosition;
	readonly orientation: RoadSide;
	readonly turnSignal: TurnSignals;
	// readonly braking;
	// readonly rotation; possible addition for when a car is at the center and needs to go right/left

	constructor(type: TrafficSubjectTypes, location: GridPosition, orientation: RoadSide, turnSignal: TurnSignals) {
		this.type = type;
		this.gridPosition = location;
		this.orientation = orientation;
		this.turnSignal = turnSignal;
	}
}
