import {Component, OnInit} from '@angular/core';
import {Answer} from '../models/answer';

@Component({
	selector: 'question-area',
	templateUrl: './question-area.component.html',
	styleUrls: ['./question-area.component.css']
})
export class QuestionAreaComponent implements OnInit {

	// @Input
	questionTitle: string = "Aktuelle Frage?";
	points: number = 1;
	answers: Answer[];

	isSolutionShown: boolean = false;
	isInfoCardShown: boolean = false;

	ngOnInit(): void {
		this.answers = [
			new Answer("Antwort 1", true),
			new Answer("Antwort 2", false),
			new Answer("Antwort 3", false)
		];
	}

	registerSolution(answerIndex: number): void {
		console.log("Answered with: " + answerIndex);
	}

	toggleInfoCard(): void {
		this.isInfoCardShown = !this.isInfoCardShown;
		console.log('toggling infocard to ' + this.isInfoCardShown);
	}

	submitAnswers(): void {
		this.isSolutionShown = true;
		console.log('answers submitted');
	}

}
