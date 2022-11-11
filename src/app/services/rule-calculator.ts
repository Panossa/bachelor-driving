import {DoAnswer} from '../models/enums/do-answer.enum';
import {Situation} from '../models/situation';

export interface RuleCalculator {
	readonly possibleDoAnswers: DoAnswer[];

	calculateCorrectDoAnswers(situation: Situation): DoAnswer[];
	// calculateCorrectCheckAnswers(): CheckAnswer[];
	// calculateCorrectExpectAnswers(): ExpectAnswers[];

}
