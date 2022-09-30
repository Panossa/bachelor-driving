import {DoAnswer} from './enums/do-answer.enum';
import {TrafficSubject} from './traffic-subject';

export class Circumstance {
	readonly id: string; // mostly (subject/object) (current position) [destination]. E.g. CAR_FROM_RIGHT_TO_THEIR_LEFT
	readonly needsRoadLeft: boolean;
	readonly needsRoadRight: boolean;
	readonly needsRoadForward: boolean;
	// readonly needsRoadBack: boolean; - not relevant, ever?

	// define all possible answers here because ALL possible DoAnswers might
	// include too many irrelevant ones like driving over train tracks:
	readonly possibleToDoAnswers: DoAnswer[];
	readonly trafficSubjects: TrafficSubject[];
	// readonly trafficHazards etc. could be added here.
}
