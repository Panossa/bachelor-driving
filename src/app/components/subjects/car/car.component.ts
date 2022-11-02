import {Component, Input, OnInit} from '@angular/core';
import {GridPosition} from '../../../models/enums/grid-position.enum';
import {HSLColor} from '../../../models/hsl-color';
import {TurnSignal} from '../../../models/enums/turn-signal.enum';

@Component({
	selector: 'subject-car',
	templateUrl: './car.component.html',
	styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

	@Input()
	gridPosition: GridPosition;
	@Input()
	turnSignal: TurnSignal = TurnSignal.NONE;
	@Input()
	baseColor: HSLColor = HSLColor.of(0, 0, 100);

	rotation: number = 0;

	scale: number = 1;

	ngOnInit(): void {
		switch (this.gridPosition) {
			case GridPosition.TOP:
				this.rotation = 180;
				break;
			case GridPosition.RIGHT:
				this.rotation = 270;
				this.scale = 1.5;
				break;
			case GridPosition.BOTTOM:
				this.rotation = 0;
				break;
			case GridPosition.LEFT:
				this.rotation = 90;
				this.scale = 1.5;
				break;
			default:
				console.error(`Car's been initialized without correct gridPosition. Given: ${this.gridPosition}`);
		}
	}

	shouldShowRightTurn(): boolean {
		return this.turnSignal === TurnSignal.RIGHT || this.turnSignal === TurnSignal.BOTH;
	}

	shouldShowLeftTurn(): boolean {
		return this.turnSignal === TurnSignal.LEFT || this.turnSignal === TurnSignal.BOTH;
	}

}
