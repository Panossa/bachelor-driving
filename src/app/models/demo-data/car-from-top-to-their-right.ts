import {Circumstance} from '../circumstance';
import {GridPosition} from '../enums/grid-position.enum';
import {RoadSide} from '../enums/road-side.enum';
import {TrafficSubjectTypes} from '../enums/traffic-subject-type.enum';
import {TurnSignals} from '../enums/turn-signal.enum';

export const CAR_FROM_TOP_TO_THEIR_RIGHT: Circumstance = {
	id: "CAR_FROM_TOP_TO_THEIR_RIGHT",
	trafficSubjects: [
		{
			gridPosition: GridPosition.TOP,
			orientation: RoadSide.OPPOSITE_DIRECTION,
			type: TrafficSubjectTypes.CAR,
			turnSignal: TurnSignals.RIGHT
		}
	]
};