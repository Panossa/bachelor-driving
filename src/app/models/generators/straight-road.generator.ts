import {Tile} from '../tile';
import {TileType} from '../tileType.enum';
import {Rotation} from '../rotation.enum';

export class StraightRoadGenerator {

	public static getRoadsideTile(rotation: Rotation): Tile {
		return new Tile(Math.random()<0.5 ? TileType.HOUSE : TileType.SIDEWALK_STRAIGHT, rotation);
	}

}
