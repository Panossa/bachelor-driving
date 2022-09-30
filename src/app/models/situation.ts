import {Circumstance} from './circumstance';
import {DriveDirections} from './enums/drive-direction.enum';
import {randomEnum} from '../utils/enum-utils';
import {DoAnswer} from './enums/do-answer.enum';
import {QuestionType} from './enums/question-type.enum';
import {removeDuplicatesFilter} from '../utils/array-utils';

export class Situation {

	readonly driveDirection: DriveDirections;
	readonly circumstances: Circumstance[] = [];
	// must be 3. Upgrade for other types of questions to: DoAnswer[] | CheckAnswer[] etc.:
	readonly answers: DoAnswer[];

	// set from outside as this is dependent on outside data:
	correctAnswers: DoAnswer[];

	// Creates a random situation
	constructor(questionType: QuestionType) {
		// Define where the user needs to drive
		this.driveDirection = randomEnum(DriveDirections);

		// Define at least one circumstance, up to 2 depending on the skill level.
		// The upper limit can be higher if enough base circumstances are defined,
		// as to not create a situation where 3 too similar circumstances are mixed.
		const circumstanceCount = Math.random() > 0.5 ? 1 : 2;
		for (let circumstanceIndex = 0; circumstanceIndex < circumstanceCount; circumstanceIndex++) {
			this.circumstances.push(new Circumstance());
		}

		// Extract all possible answers for the current answer type
		if(questionType === QuestionType.DO_QUESTION) {
			this.answers = this.circumstances.map(circumstance => circumstance.possibleToDoAnswers).reduce(
				(previousPossibleAnswers, currentPossibleAnswers) => [...previousPossibleAnswers, ...currentPossibleAnswers],
				[]
			).filter(removeDuplicatesFilter);
		} else {
			console.error('Wrong question type?!');
		}
	}

}
