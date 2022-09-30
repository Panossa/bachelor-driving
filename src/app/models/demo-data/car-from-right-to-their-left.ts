import {Circumstance} from '../circumstance';
import {GridPosition} from '../enums/grid-position.enum';
import {RoadSide} from '../enums/road-side.enum';
import {TrafficSubjectTypes} from '../enums/traffic-subject-type.enum';
import {TurnSignals} from '../enums/turn-signal.enum';
import {DoAnswer} from '../enums/do-answer.enum';

export class CarFromRightToTheirLeft {

}

const CAR_FROM_RIGHT_TO_THEIR_LEFT: Circumstance = {
	id: "CAR_FROM_RIGHT_TO_THEIR_LEFT",
	needsRoadForward: false,
	needsRoadLeft: false,
	needsRoadRight: true,
	possibleToDoAnswers: [
		DoAnswer.STALEMATE
	],
	trafficSubjects: [
		{
			location: GridPosition.RIGHT,
			orientation: RoadSide.OPPOSITE_DIRECTION,
			type: TrafficSubjectTypes.CAR,
			turnSignal: TurnSignals.LEFT
		}
	]
};

export default CAR_FROM_RIGHT_TO_THEIR_LEFT;
