import {Component, OnInit} from '@angular/core';
import {Tile} from '../models/tile';
import {TileType} from '../models/tileType.enum';
import {StraightRoadGenerator} from '../models/generators/straight-road.generator';
import {Rotations} from '../models/enums/rotation.enum';

@Component({
	selector: 'question-media',
	templateUrl: './question-media.component.html',
	styleUrls: ['./question-media.component.css']
})
export class QuestionMediaComponent implements OnInit {

	tilesData: Tile[]; //always exactly 9 elements!

	// temp:
	private straightRoad = [
		StraightRoadGenerator.getRoadsideTile(Rotations.RIGHT), new Tile(TileType.ROAD_STRAIGHT), StraightRoadGenerator.getRoadsideTile(Rotations.LEFT),
		StraightRoadGenerator.getRoadsideTile(Rotations.RIGHT), new Tile(TileType.ROAD_STRAIGHT), StraightRoadGenerator.getRoadsideTile(Rotations.LEFT),
		StraightRoadGenerator.getRoadsideTile(Rotations.RIGHT), new Tile(TileType.ROAD_STRAIGHT), StraightRoadGenerator.getRoadsideTile(Rotations.LEFT)
	];
	private crossingRoad = [
		new Tile(TileType.SIDEWALK_CURVED, Rotations.DOWN), 		new Tile(TileType.STOP, Rotations.DOWN), new Tile(TileType.SIDEWALK_CURVED, Rotations.LEFT),
		new Tile(TileType.STOP, Rotations.RIGHT), 							new Tile(TileType.ROADWAY), 						new Tile(TileType.STOP, Rotations.LEFT),
		new Tile(TileType.SIDEWALK_CURVED, Rotations.RIGHT), 	new Tile(TileType.STOP, Rotations.UP), 	new Tile(TileType.SIDEWALK_CURVED, Rotations.UP)
	]
	private tJunction = [
		StraightRoadGenerator.getRoadsideTile(Rotations.DOWN), StraightRoadGenerator.getRoadsideTile(Rotations.DOWN), StraightRoadGenerator.getRoadsideTile(Rotations.DOWN),
		new Tile(TileType.STOP, Rotations.RIGHT), 							new Tile(TileType.ROADWAY), 						new Tile(TileType.STOP, Rotations.LEFT),
		new Tile(TileType.SIDEWALK_CURVED, Rotations.RIGHT), 	new Tile(TileType.STOP, Rotations.UP), 	new Tile(TileType.SIDEWALK_CURVED, Rotations.UP)
	]

	ngOnInit(): void {
		this.tilesData = Math.random() < 0.5 ? this.crossingRoad : this.straightRoad;
	}

}
