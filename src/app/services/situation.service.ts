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

	correctAnswers: DoAnswer[] = [];

	constructor(private rightOfWayService: RightOfWayService) {}

	get answers(): DoAnswer[] {
		return this.currentSituation.answers;
	}

	generateNewSituation(): void {
		this.questionType = QuestionType.DO_QUESTION; // TODO add support for more
		this.currentSituation = new Situation(this.questionType);

		// Check for main rule giver in the following order: [TrafficLights, TrafficSigns, default: RightOfWay]
		// TODO other rule systems
		if(this.questionType === QuestionType.DO_QUESTION) {
			this.correctAnswers = this.rightOfWayService.calculateCorrectDoAnswers(
				this.currentSituation.driveDirection,
				this.currentSituation.circumstances
			);
		}

		console.log('Generated situation!');
	}

}
