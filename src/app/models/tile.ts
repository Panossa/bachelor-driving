import {TileType} from './tileType.enum';
import {Rotations} from './enums/rotation.enum';

export class Tile {
	tileType: TileType;
	rotation: Rotations;

	constructor(tileType: TileType, rotation: Rotations = Rotations.RIGHT) {
		this.tileType = tileType;
		this.rotation = rotation;
	}

}
