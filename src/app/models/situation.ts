import {Circumstance} from './circumstance';
import {DriveDirections} from './enums/drive-direction.enum';
import {DoAnswer} from './enums/do-answer.enum';
import {randomEnum} from '../utils/enum-utils';

export class Situation {

	readonly driveDirection: DriveDirections;
	readonly circumstances: Circumstance[] = [];

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
		// as to not create a situation where 3 too similar circumstances are mixed. TODO test with 4 right turning cars
		const circumstanceCount = 1; //Math.random() > 0.5 ? 1 : 2
		console.log(`Generating ${circumstanceCount} circumstances.`);
		for (let circumstanceIndex = 0; circumstanceIndex < circumstanceCount; circumstanceIndex++) {
			this.circumstances.push(new Circumstance());
		}
	}

}
