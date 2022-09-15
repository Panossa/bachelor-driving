import {Component, OnInit} from '@angular/core';
import {Tile} from '../models/tile';
import {TileType} from '../models/tileType.enum';
import {Rotation} from '../models/rotation.enum';
import {StraightRoadGenerator} from '../models/generators/straight-road.generator';

@Component({
	selector: 'question-media',
	templateUrl: './question-media.component.html',
	styleUrls: ['./question-media.component.css']
})
export class QuestionMediaComponent implements OnInit {

	tilesData: Tile[]; //always exactly 9 elements!

	// temp:
	private straightRoad = [
		StraightRoadGenerator.getRoadsideTile(Rotation.RIGHT), new Tile(TileType.ROAD_STRAIGHT), StraightRoadGenerator.getRoadsideTile(Rotation.LEFT),
		StraightRoadGenerator.getRoadsideTile(Rotation.RIGHT), new Tile(TileType.ROAD_STRAIGHT), StraightRoadGenerator.getRoadsideTile(Rotation.LEFT),
		StraightRoadGenerator.getRoadsideTile(Rotation.RIGHT), new Tile(TileType.ROAD_STRAIGHT), StraightRoadGenerator.getRoadsideTile(Rotation.LEFT)
	];
	private crossingRoad = [
		new Tile(TileType.SIDEWALK_CURVED, Rotation.DOWN), 		new Tile(TileType.STOP, Rotation.DOWN), new Tile(TileType.SIDEWALK_CURVED, Rotation.LEFT),
		new Tile(TileType.STOP, Rotation.RIGHT), 							new Tile(TileType.ROADWAY), 						new Tile(TileType.STOP, Rotation.LEFT),
		new Tile(TileType.SIDEWALK_CURVED, Rotation.RIGHT), 	new Tile(TileType.STOP, Rotation.UP), 	new Tile(TileType.SIDEWALK_CURVED, Rotation.UP)
	]
	private tJunction = [
		StraightRoadGenerator.getRoadsideTile(Rotation.DOWN), StraightRoadGenerator.getRoadsideTile(Rotation.DOWN), StraightRoadGenerator.getRoadsideTile(Rotation.DOWN),
		new Tile(TileType.STOP, Rotation.RIGHT), 							new Tile(TileType.ROADWAY), 						new Tile(TileType.STOP, Rotation.LEFT),
		new Tile(TileType.SIDEWALK_CURVED, Rotation.RIGHT), 	new Tile(TileType.STOP, Rotation.UP), 	new Tile(TileType.SIDEWALK_CURVED, Rotation.UP)
	]

	ngOnInit(): void {
		this.tilesData = Math.random() < 0.5 ? this.crossingRoad : this.straightRoad;
		// this.tilesData = this.tJunction;
	}

}
