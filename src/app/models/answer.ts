export class Answer {
	answerText: string;
	isCorrect: boolean;

	constructor(answerText: string, isCorrect: boolean) {
		this.answerText = answerText;
		this.isCorrect = isCorrect;
	}
}
