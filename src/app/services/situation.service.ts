import {Injectable} from '@angular/core';
import {Situation} from '../models/situation';
import {RightOfWayService} from './right-of-way.service';
import {QuestionType} from '../models/enums/question-type.enum';
import {clamp} from '../utils/number-utils';
import {STREET_LAYOUTS} from '../models/street-layout';
import {OvertakeService} from './overtake.service';

@Injectable({
	providedIn: 'root'
})
export class SituationService {

	// Starting points for situation generation:
	currentSituation: Situation;
	questionType: QuestionType;
	// For testing purposes, usually between 1-3
	currentDifficulty: number;

	private static readonly MINIMUM_DIFFICULTY = 1;
	private static readonly MAXIMUM_DIFFICULTY = 5;
	private static readonly INITIAL_DIFFICULTY = SituationService.MINIMUM_DIFFICULTY;
	private static readonly DIFFICULTY_CHANGE_AMOUNT = 0.5;

	constructor(private rightOfWayService: RightOfWayService, private overtakeService: OvertakeService) {
		this.currentDifficulty = SituationService.INITIAL_DIFFICULTY;
	}

	generateNewSituation(): void {
		this.questionType = QuestionType.DO_QUESTION;
		this.currentSituation = new Situation(this.currentDifficulty);

		// Check for main rule giver in the following order: [TrafficLights, TrafficSigns, default: RightOfWay]
		if (this.questionType === QuestionType.DO_QUESTION) {
			// Get all possible answers for the current answer type.
			// For this, ask the highest active rule set for all possible ones.
			if(this.currentSituation.streetLayout === STREET_LAYOUTS.STRAIGHT_ROAD) {
				// also possible: if(no traffic lights and no signs present)
				this.currentSituation.answers = this.overtakeService.possibleDoAnswers;
				this.currentSituation.correctAnswers = this.overtakeService.calculateCorrectDoAnswers(this.currentSituation);
			} else {
				this.currentSituation.answers = this.rightOfWayService.possibleDoAnswers;
				this.currentSituation.correctAnswers = this.rightOfWayService.calculateCorrectDoAnswers(this.currentSituation);
			}
		}

		console.log(`Generated situation for difficulty ${this.currentDifficulty}!`);
	}

	/**
	 * Updates the current difficulty levels depending on whether the last question was answered correctly.<br>
	 * Calculation changes the difficulty in a positive or negative direction for an amount of 0.5 depending on the answer.<br>
	 * This might later be expanded with timeToAnswer in milliseconds as well as the points worth of the question for finer adjustments.
	 */
	updateDifficulty(answeredCorrectly: boolean): void {
		console.log(`Updating difficulty. Answer was ${answeredCorrectly ? 'correct' : 'not correct'}.`);
		const deltaDirection = answeredCorrectly ? 1 : -1;
		this.currentDifficulty = clamp(
			this.currentDifficulty + deltaDirection * SituationService.DIFFICULTY_CHANGE_AMOUNT,
			SituationService.MINIMUM_DIFFICULTY,
			SituationService.MAXIMUM_DIFFICULTY
		);
		console.log(`New difficulty: ${this.currentDifficulty}`);
	}

}
