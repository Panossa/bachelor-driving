import {TileType} from './tileType.enum';
import {Rotation} from './enums/rotation.enum';

export class Tile {
	tileType: TileType;
	rotation: Rotation;

	constructor(tileType: TileType, rotation: Rotation = Rotation.RIGHT) {
		this.tileType = tileType;
		this.rotation = rotation;
	}

}
