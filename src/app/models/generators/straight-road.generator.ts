import {Tile} from '../tile';
import {TileType} from '../tileType.enum';
import {Rotations} from '../enums/rotation.enum';

/**
 * @deprecated
 */
export class StraightRoadGenerator {

	public static getRoadsideTile(rotation: Rotations): Tile {
		return new Tile(Math.random()<0.5 ? TileType.HOUSE : TileType.SIDEWALK_STRAIGHT, rotation);
	}

}
