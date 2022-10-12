import {Circumstance} from './circumstance';
import {DriveDirections} from './enums/drive-direction.enum';
import {DoAnswer} from './enums/do-answer.enum';
import {randomEnum} from '../utils/enum-utils';
import {GridPosition} from './enums/grid-position.enum';
import {TurnSignals} from './enums/turn-signal.enum';
import {RoadSide} from './enums/road-side.enum';

export class Situation {

	readonly driveDirection: DriveDirections;
	readonly circumstances: Circumstance[] = [];

	needsRoadLeft: boolean = false;
	needsRoadRight: boolean = false;
	needsRoadForward: boolean = false;
	// readonly needsRoadBack: boolean; - not relevant, ever?

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
		for (let circumstanceIndex = 0; circumstanceIndex < circumstanceCount; circumstanceIndex++) {
			this.circumstances.push(new Circumstance());
		}

		// Calculating which streets are needed. This ignores it's possible to turn into a garage rather than street, sadly.
		this.circumstances.forEach(circumstance => {
			circumstance.trafficSubjects.forEach(subject => {
				switch (subject.gridPosition) {
					case GridPosition.LEFT:
						this.needsRoadLeft = true;
						// If they want left, it's forward for us. Turning right would be into our street. Turn signals are ignored if subject is driving AWAY.
						this.needsRoadForward = this.needsRoadForward || (subject.orientation === RoadSide.OPPOSITE_DIRECTION && subject.turnSignal === TurnSignals.LEFT);
						break;
					case GridPosition.RIGHT:
						this.needsRoadRight = true;
						this.needsRoadForward = this.needsRoadForward || (subject.orientation === RoadSide.OPPOSITE_DIRECTION && subject.turnSignal === TurnSignals.RIGHT);
						break;
					case GridPosition.TOP:
						this.needsRoadForward = true;
						// From their perspective, turning in a direction means the opposite direction for us.
						this.needsRoadRight = this.needsRoadRight || (subject.orientation === RoadSide.OPPOSITE_DIRECTION && subject.turnSignal === TurnSignals.LEFT);
						this.needsRoadLeft = this.needsRoadLeft || (subject.orientation === RoadSide.OPPOSITE_DIRECTION && subject.turnSignal === TurnSignals.RIGHT);
						break;
				}
			});
		});
	}

}
