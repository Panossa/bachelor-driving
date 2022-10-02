import {TrafficSubject} from './traffic-subject';
import CAR_FROM_RIGHT_TO_THEIR_LEFT from './demo-data/car-from-right-to-their-left';

export class Circumstance {
	readonly id: string; // mostly (subject/object) (current position) [destination]. E.g. CAR_FROM_RIGHT_TO_THEIR_LEFT
	readonly needsRoadLeft: boolean;
	readonly needsRoadRight: boolean;
	readonly needsRoadForward: boolean;
	// readonly needsRoadBack: boolean; - not relevant, ever?

	readonly trafficSubjects: TrafficSubject[];
	// readonly trafficHazards etc. could be added here.

	constructor() {
		// TODO get random circ from the demo folder
		const circData = CAR_FROM_RIGHT_TO_THEIR_LEFT;
		this.id = circData.id;
		this.needsRoadLeft = circData.needsRoadLeft;
		this.needsRoadRight = circData.needsRoadRight;
		this.needsRoadForward = circData.needsRoadForward;
		this.trafficSubjects = circData.trafficSubjects;
	}
}
