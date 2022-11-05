import {Component, OnInit} from '@angular/core';
import {Answer} from '../../models/answer';
import {SituationService} from '../../services/situation.service';
import {DoAnswer} from '../../models/enums/do-answer.enum';

@Component({
	selector: 'question-area',
	templateUrl: './question-area.component.html',
	styleUrls: ['./question-area.component.css']
})
export class QuestionAreaComponent implements OnInit {

	// @Input
	questionTitle: string;
	points: number = 1;
	answers: Answer[];

	isSolutionShown: boolean;
	isInfoCardShown: boolean;

	private pickedAnswerIndexes: [boolean, boolean, boolean];

	constructor(private situationService: SituationService) {}

	ngOnInit(): void {
		const situationAnswers = this.situationService.currentSituation.answers;
		const correctAnswers = this.situationService.currentSituation.correctAnswers;
		this.isSolutionShown = false;
		this.isInfoCardShown = false;
		this.pickedAnswerIndexes = [false, false, false];

		// Update title according to the type of answers we're showing.
		if (Object.values(DoAnswer).includes(situationAnswers[0])) {
			this.questionTitle = "Was tun Sie in dieser Situation?";
		}

		this.answers = [
			new Answer(this.generateAnswerText(situationAnswers[0]), correctAnswers.includes(situationAnswers[0])),
			new Answer(this.generateAnswerText(situationAnswers[1]), correctAnswers.includes(situationAnswers[1])),
			new Answer(this.generateAnswerText(situationAnswers[2]), correctAnswers.includes(situationAnswers[2]))
		];
	}

	generateAnswerText(answer): string {
		return `Ich ${answer}.`;
	}

	registerSolution(answerIndex: number): void {
		if (this.isSolutionShown) return;

		console.log("Answered with: " + answerIndex);
		this.pickedAnswerIndexes[answerIndex] = !this.pickedAnswerIndexes[answerIndex];

		console.log(`pickedAnswers: ${this.pickedAnswerIndexes}`);
	}

	toggleInfoCard(): void {
		this.isInfoCardShown = !this.isInfoCardShown;
		console.log('toggling infocard to ' + this.isInfoCardShown);
	}

	submitAnswers(): void {
		this.isSolutionShown = true;
		console.log('answers submitted');
	}

	nextQuestion(): void {
		this.situationService.generateNewSituation();
		// This could also be done via ngOnChanges, but it's worse for performance so OnInit must do. Best way would be to set up own listeners.
		this.ngOnInit();
	}
}
