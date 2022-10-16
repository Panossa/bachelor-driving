import {Circumstance} from './circumstance';
import {DriveDirections} from './enums/drive-direction.enum';
import {DoAnswer} from './enums/do-answer.enum';
import {randomEnum} from '../utils/enum-utils';
import {GridPosition} from './enums/grid-position.enum';
import {TurnSignals} from './enums/turn-signal.enum';
import {RoadSide} from './enums/road-side.enum';
import {TrafficSubject} from './traffic-subject';

export class Situation {

	readonly driveDirection: DriveDirections;

	needsRoadLeft: boolean = false;
	needsRoadRight: boolean = false;
	needsRoadForward: boolean = false;
	// readonly needsRoadBack: boolean; - not relevant, ever?
	trafficSubjects: TrafficSubject[] = [];


	// must be max. 3. Upgrade for other types of questions to: DoAnswer[] | CheckAnswer[] etc.:
	// Possible answers are dependent on the highest active rule set (e.g. traffic lights) and set from outside.
	answers: DoAnswer[];
	// set from outside as this is dependent on outside data:
	correctAnswers: DoAnswer[];

	// Creates a random situation
	constructor() {
		// Define where the user needs to drive
		this.driveDirection = randomEnum(DriveDirections, 1);

		// Define at least one circumstance, up to 2 depending on the skill level.
		// The upper limit can be higher if enough base circumstances are defined,
		// as to not create a situation where 3 too similar circumstances are mixed.
		const circumstanceCount = Math.random() > 0.5 ? 1 : 2;
		console.log(`Generating ${circumstanceCount} circumstances.`);
		const circumstances: Circumstance[] = [];
		for (let circumstanceIndex = 0; circumstanceIndex < circumstanceCount; circumstanceIndex++) {
			circumstances.push(new Circumstance());
		}

		// Aggregating trafficSubjects into one array, removing those who would stack up on one side. Also counting streets.
		circumstances.forEach(circumstance => {
			circumstance.trafficSubjects.forEach(newSubject => {
				if (!this.isAnotherSubjectOccupying(newSubject)) {
					// FCFS system: first subject to occupy a specific side of the road on either side of the situation will be the only one allowed to stay there.
					this.trafficSubjects.push(newSubject);

					// Counting their needed streets.
					this.updateNeededRoads(newSubject);
				}
			});
		});
	}

	/**
	 * Tests whether another subject is occupying the spot (same road side of same position on the grid).
	 * @private
	 */
	private isAnotherSubjectOccupying(newSubject: TrafficSubject): boolean {
		return this.trafficSubjects.find(alreadyPresentSubject => alreadyPresentSubject.gridPosition === newSubject.gridPosition && alreadyPresentSubject.orientation === newSubject.orientation) != null;
	}

	/**
	 * This ignores it's possible to turn into a garage rather than street, sadly.
	 * @private
	 */
	private updateNeededRoads(newSubject: TrafficSubject): void {
		switch (newSubject.gridPosition) {
			case GridPosition.LEFT:
				this.needsRoadLeft = true;
				// If they want left, it's forward for us. Turning right would be into our street. Turn signals are ignored if subject is driving AWAY.
				this.needsRoadForward = this.needsRoadForward || (newSubject.orientation === RoadSide.OPPOSITE_DIRECTION && newSubject.turnSignal === TurnSignals.LEFT);
				break;
			case GridPosition.RIGHT:
				this.needsRoadRight = true;
				this.needsRoadForward = this.needsRoadForward || (newSubject.orientation === RoadSide.OPPOSITE_DIRECTION && newSubject.turnSignal === TurnSignals.RIGHT);
				break;
			case GridPosition.TOP:
				this.needsRoadForward = true;
				// From their perspective, turning in a direction means the opposite direction for us.
				this.needsRoadRight = this.needsRoadRight || (newSubject.orientation === RoadSide.OPPOSITE_DIRECTION && newSubject.turnSignal === TurnSignals.LEFT);
				this.needsRoadLeft = this.needsRoadLeft || (newSubject.orientation === RoadSide.OPPOSITE_DIRECTION && newSubject.turnSignal === TurnSignals.RIGHT);
				break;
		}
	}

}
