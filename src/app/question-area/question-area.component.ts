import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'question-area',
	templateUrl: './question-area.component.html',
	styleUrls: ['./question-area.component.css']
})
export class QuestionAreaComponent implements OnInit {

	// @Input
	questionTitle: string = "Aktuelle Frage?";
	points: number = 1;

	constructor() {
	}

	ngOnInit(): void {
	}

}
