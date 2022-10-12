import {Injectable} from '@angular/core';
import {Situation} from '../models/situation';
import {DoAnswer} from '../models/enums/do-answer.enum';
import {RightOfWayService} from './right-of-way.service';
import {QuestionType} from '../models/enums/question-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SituationService {

	// Starting points for situation generation:
	currentSituation: Situation;
	questionType: QuestionType;

	constructor(private rightOfWayService: RightOfWayService) {}

	get answers(): DoAnswer[] {
		return this.currentSituation.answers;
	}

	generateNewSituation(): void {
		this.questionType = QuestionType.DO_QUESTION;
		this.currentSituation = new Situation();

		// Check for main rule giver in the following order: [TrafficLights, TrafficSigns, default: RightOfWay]
		if(this.questionType === QuestionType.DO_QUESTION) {
			// Get all possible answers for the current answer type.
			// For this, ask the highest active rule set for all possible ones.
			// For later: if(no traffic lights and no signs present) {
			this.currentSituation.answers = this.rightOfWayService.possibleDoAnswers;

			this.currentSituation.correctAnswers = this.rightOfWayService.calculateCorrectDoAnswers(this.currentSituation);
			// }
		}

		console.log('Generated situation!');
	}

}
