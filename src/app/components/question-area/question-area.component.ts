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

	private pickedAnswers: boolean[];

	constructor(private situationService: SituationService) {}

	ngOnInit(): void {
		const situationAnswers = this.situationService.currentSituation.answers;
		const correctAnswers = this.situationService.currentSituation.correctAnswers;
		this.isSolutionShown = false;
		this.isInfoCardShown = false;

		// Update title according to the type of answers we're showing.
		if (Object.values(DoAnswer).includes(situationAnswers[0])) {
			this.questionTitle = "Was tun Sie in dieser Situation?";
		}

		this.answers = [
			...situationAnswers.map(doAnswer => new Answer(this.generateAnswerText(doAnswer), correctAnswers.includes(doAnswer)))
		];
		// initialize pickedAnswers with a boolean array full of false for every possible answer
		this.pickedAnswers = this.answers.map(_ => false);
	}

	generateAnswerText(answer): string {
		return `Ich ${answer}.`;
	}

	registerSolution(answerIndex: number): void {
		if (this.isSolutionShown) return;

		console.log("Answered with: " + answerIndex);
		this.pickedAnswers[answerIndex] = !this.pickedAnswers[answerIndex];

		console.log(`pickedAnswers: ${this.pickedAnswers}`);
	}

	toggleInfoCard(): void {
		this.isInfoCardShown = !this.isInfoCardShown;
		console.log('toggling info card to ' + this.isInfoCardShown);
	}

	submitAnswers(): void {
		this.isSolutionShown = true;
		const correctAnswers = this.answers.filter(answer => answer.isCorrect);
		// Check that for every picked answer, the correct answers include said answer. Similarly, all NOT picked answers should not be part of the correct answer.
		const allAnswersCorrect = this.pickedAnswers.every((answerPicked, index) => (answerPicked && correctAnswers.includes(this.answers[index])) || (!answerPicked && !correctAnswers.includes(this.answers[index])));
		this.situationService.updateDifficulty(allAnswersCorrect);
	}

	nextQuestion(): void {
		this.situationService.generateNewSituation();
		// This could also be done via ngOnChanges, but it's worse for performance so OnInit must do. Best way would be to set up own listeners.
		this.ngOnInit();
	}
}
