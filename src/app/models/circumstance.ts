import {TrafficSubject} from './traffic-subject';
import {CIRCUMSTANCE_LIST} from './demo-data';
import {randomIntFromInterval} from '../utils/number-utils';

export class Circumstance {
	readonly id: string; // mostly (subject/object) (current position) [destination]. E.g. CAR_FROM_RIGHT_TO_THEIR_LEFT
	readonly trafficSubjects: TrafficSubject[];
	// readonly trafficHazards etc. could be added here.

	constructor() {
		// TODO only allow the generation of circs that involve users on unused roads through constructor arguments for the grid position
		const circData = CIRCUMSTANCE_LIST[randomIntFromInterval(0, CIRCUMSTANCE_LIST.length-1)];
		this.id = circData.id;
		this.trafficSubjects = circData.trafficSubjects;
	}
}
