import {Circumstance} from '../circumstance';
import {GridPosition} from '../enums/grid-position.enum';
import {RoadSide} from '../enums/road-side.enum';
import {TrafficSubjectTypes} from '../enums/traffic-subject-type.enum';
import {TurnSignal} from '../enums/turn-signal.enum';
import {SubjectColors} from '../subject-colors';

export const CAR_FROM_LEFT_TO_THEIR_LEFT: Circumstance = {
	id: "CAR_FROM_LEFT_TO_THEIR_LEFT",
	trafficSubjects: [
		{
			gridPosition: GridPosition.LEFT,
			orientation: RoadSide.OPPOSITE_DIRECTION,
			type: TrafficSubjectTypes.CAR,
			turnSignal: TurnSignal.LEFT,
			baseColor: SubjectColors.DARK_GRAY
		}
	]
};
