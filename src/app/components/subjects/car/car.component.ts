import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GridPosition} from '../../../models/enums/grid-position.enum';
import {HSLColor} from '../../../models/hsl-color';
import {TurnSignal} from '../../../models/enums/turn-signal.enum';
import {RoadSide} from '../../../models/enums/road-side.enum';
import {betterMod} from '../../../utils/number-utils';

@Component({
	selector: 'subject-car',
	templateUrl: './car.component.html',
	styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit, OnDestroy {
	@Input()
	gridPosition: GridPosition;

	@Input()
	roadSide: RoadSide;
	@Input()
	turnSignal: TurnSignal = TurnSignal.NONE;
	@Input()
	baseColor: HSLColor = HSLColor.of(0, 0, 100);

	rotation: number = 0;
	scale: number = 1;

	isTurnSignalShown: boolean;
	turnSignalTimer;

	constructor(private changeDetection: ChangeDetectorRef) {
	}


	ngOnInit(): void {
		this.isTurnSignalShown = false;
		this.turnSignalTimer = setInterval(() => this.toggleTurnSignal(), 500);

		let baseRotation;
		let relativeRotation;
		switch (this.gridPosition) {
			case GridPosition.CENTER:
				baseRotation = 180;
				break;
			case GridPosition.TOP:
				baseRotation = 180;
				break;
			case GridPosition.RIGHT:
				baseRotation = 270;
				this.scale = 1.5;
				break;
			case GridPosition.BOTTOM:
				baseRotation = 0;
				break;
			case GridPosition.LEFT:
				baseRotation = 90;
				this.scale = 1.5;
				break;
			default:
				console.error(`Car's been initialized without correct gridPosition. Given: ${this.gridPosition}`);
		}

		switch(this.roadSide) {
			case RoadSide.OPPOSITE_DIRECTION:
				relativeRotation = 0;
				break;
			case RoadSide.TRAVEL_DIRECTION:
				relativeRotation = 180;
				break;
			default:
				console.error(`Car has no roadside defined!`);
		}

		this.rotation = betterMod(relativeRotation + baseRotation, 360);
	}

	ngOnDestroy(): void {
		// Destroy interval timer
		clearInterval(this.turnSignalTimer);
	}

	shouldShowRightTurn(): boolean {
		return this.turnSignal === TurnSignal.RIGHT || this.turnSignal === TurnSignal.BOTH;
	}

	shouldShowLeftTurn(): boolean {
		return this.turnSignal === TurnSignal.LEFT || this.turnSignal === TurnSignal.BOTH;
	}

	private toggleTurnSignal(): void {
		this.isTurnSignalShown = !this.isTurnSignalShown;
		this.changeDetection.detectChanges();
	}
}
