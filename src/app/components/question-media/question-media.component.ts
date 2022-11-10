import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Tile} from '../../models/tile';
import {SubjectTile} from '../../models/subject-tile';
import {GridPosition} from '../../models/enums/grid-position.enum';
import {RoadSide} from '../../models/enums/road-side.enum';
import {generateRoadTiles} from '../../utils/road-utils';
import {Situation} from '../../models/situation';

@Component({
	selector: 'question-media',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './question-media.component.html',
	styleUrls: ['./question-media.component.css']
})
export class QuestionMediaComponent implements OnInit, OnChanges {

	// This could maybe be gotten with better performance via custom event emitter and subscribes, but it works.
	@Input()
	situation: Situation;

	GridPosition = GridPosition;
	tilesData: Tile[]; //always exactly 9 elements!
	subjectData: SubjectTile[]; // see above

	ngOnInit(): void {
		this.tilesData = generateRoadTiles(this.situation);

		this.subjectData = [
			SubjectTile.createEmpty(), SubjectTile.createEmpty(), SubjectTile.createEmpty(),
			SubjectTile.createEmpty(), SubjectTile.createEmpty(), SubjectTile.createEmpty(),
			SubjectTile.createEmpty(), SubjectTile.createEmpty(), SubjectTile.createEmpty()
		];

		[...this.situation.trafficSubjects, this.situation.oneself].forEach(subject => {
			// check grid position and road side
			/* Positions/indices:
			 * 0,1,2
			 * 3,4,5 - e.g. 3 = LEFT
			 * 6,7,8
			 */
			switch (subject.gridPosition) {
				case GridPosition.TOP:
					// on the top, the subject opposite to the user is on the left, therefore the first subject if read from the left.
					if (subject.orientation === RoadSide.OPPOSITE_DIRECTION) {
						this.subjectData[1].trafficSubject1 = subject;
					} else {
						this.subjectData[1].trafficSubject2 = subject;
					}
					break;
				case GridPosition.LEFT:
					// on the left, read from the top, the first subject is in the travel direction of the user.
					if (subject.orientation === RoadSide.TRAVEL_DIRECTION) {
						this.subjectData[3].trafficSubject1 = subject;
					} else {
						this.subjectData[3].trafficSubject2 = subject;
					}
					break;
				case GridPosition.RIGHT:
					if (subject.orientation === RoadSide.OPPOSITE_DIRECTION) {
						this.subjectData[5].trafficSubject1 = subject;
					} else {
						this.subjectData[5].trafficSubject2 = subject;
					}
					break;
				case GridPosition.BOTTOM:
					if (subject.orientation === RoadSide.TRAVEL_DIRECTION) {
						this.subjectData[7].trafficSubject1 = subject;
					} else {
						this.subjectData[7].trafficSubject2 = subject;
					}
					break;
				default: console.error("A subject has an invalid grid position!");
			}
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.ngOnInit();
	}

	isOnGridPosition(subjectTile: SubjectTile, gridPosition: GridPosition): boolean {
		return this.isOnGridPositions(subjectTile, [gridPosition]);
	}

	isOnGridPositions(subjectTile: SubjectTile, gridPositions: GridPosition[]): boolean {
		return gridPositions.find(allowedGridPosition => allowedGridPosition === subjectTile.gridPosition) != null;
	}
}
