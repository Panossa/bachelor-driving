import {GridPosition} from '../models/enums/grid-position.enum';
import {TrafficSubject} from '../models/traffic-subject';
import {TurnSignal} from '../models/enums/turn-signal.enum';
import {Situation} from '../models/situation';
import {Tile} from '../models/tile';
import {STREET_LAYOUTS} from '../models/street-layout';
import {TileType} from '../models/tile-type.enum';
import {Rotation} from '../models/enums/rotation.enum';
import {betterMod} from './number-utils';

/**
 * Used in filter() methods to only return subjects who have no one on their right on the grid.
 * @param subject the subject to test with/as
 * @param remainingTrafficSubjects a reference to all remaining traffic subjects on the street
 */
export function haveNoneOnTheirRightFilter(subject: TrafficSubject, remainingTrafficSubjects: TrafficSubject[]): boolean {
	if (subject.gridPosition === GridPosition.CENTER) {
		console.error(`Tried finding right of center! Subject: ${JSON.stringify(subject)} of ${remainingTrafficSubjects}`);
	}
	// Find any otherSubject on the right of subject, negate result.
	return !remainingTrafficSubjects.find(otherSubject => otherSubject.gridPosition == ((subject.gridPosition + 1) % 4));
}

/**
 * Returns true for each subject NOT able to block the way of someone. For subjects coming from the opposite side, they can block a path if they want to turn anywhere but left.
 */
export function haveNoneOnOppositeSiteWhoCanBlock(subject: TrafficSubject, remainingTrafficSubjects: TrafficSubject[]): boolean {
	if (subject.gridPosition === GridPosition.CENTER) {
		console.error('Subject has invalid GridPosition of CENTER');
		return false;
	}
	return !remainingTrafficSubjects.find(otherSubject =>
		otherSubject.turnSignal !== TurnSignal.LEFT
		&& otherSubject.gridPosition === betterMod(subject.gridPosition - 2, 4)
	);
}

export function generateRoadsideTile(rotation: Rotation = Rotation.RIGHT): Tile {
	return new Tile(Math.random()<0.5 ? TileType.HOUSE : TileType.SIDEWALK_STRAIGHT, rotation);
}

export function generateRoadTiles(situation: Situation): Tile[] {
	if (situation.streetLayout === STREET_LAYOUTS.STRAIGHT_ROAD) {
		return [
			generateRoadsideTile(), new Tile(TileType.ROAD_STRAIGHT), generateRoadsideTile(Rotation.LEFT),
			generateRoadsideTile(), new Tile(TileType.ROAD_STRAIGHT), generateRoadsideTile(Rotation.LEFT),
			generateRoadsideTile(), new Tile(TileType.ROAD_STRAIGHT), generateRoadsideTile(Rotation.LEFT)
		];
	}
	if (situation.streetLayout === STREET_LAYOUTS.FULL_CROSSING) {
		return [
			new Tile(TileType.SIDEWALK_CURVED, Rotation.DOWN), 	new Tile(TileType.STOP, Rotation.DOWN), new Tile(TileType.SIDEWALK_CURVED, Rotation.LEFT),
			new Tile(TileType.STOP, Rotation.RIGHT), 						new Tile(TileType.ROADWAY), 						new Tile(TileType.STOP, Rotation.LEFT),
			new Tile(TileType.SIDEWALK_CURVED, Rotation.RIGHT), new Tile(TileType.STOP, Rotation.UP), 	new Tile(TileType.SIDEWALK_CURVED, Rotation.UP)
		];
	}
	if (situation.streetLayout === STREET_LAYOUTS.T_CROSSING_LEFT_FORWARD) {
		return [
			new Tile(TileType.SIDEWALK_CURVED, Rotation.DOWN), 	new Tile(TileType.STOP, Rotation.DOWN), generateRoadsideTile(Rotation.LEFT),
			new Tile(TileType.STOP, Rotation.RIGHT), 						new Tile(TileType.ROADWAY), 						generateRoadsideTile(Rotation.LEFT),
			new Tile(TileType.SIDEWALK_CURVED, Rotation.RIGHT), new Tile(TileType.STOP, Rotation.UP), 	generateRoadsideTile(Rotation.LEFT)
		];
	}
	if (situation.streetLayout === STREET_LAYOUTS.T_CROSSING_LEFT_RIGHT) {
		return [
			generateRoadsideTile(Rotation.DOWN),								generateRoadsideTile(Rotation.DOWN), 	generateRoadsideTile(Rotation.DOWN),
			new Tile(TileType.STOP, Rotation.RIGHT), 						new Tile(TileType.ROADWAY), 					new Tile(TileType.STOP, Rotation.LEFT),
			new Tile(TileType.SIDEWALK_CURVED, Rotation.RIGHT), new Tile(TileType.STOP, Rotation.UP), new Tile(TileType.SIDEWALK_CURVED, Rotation.UP)
		];
	}
	if (situation.streetLayout === STREET_LAYOUTS.T_CROSSING_RIGHT_FORWARD) {
		return [
			generateRoadsideTile(), 	new Tile(TileType.STOP, Rotation.DOWN), new Tile(TileType.SIDEWALK_CURVED, Rotation.LEFT),
			generateRoadsideTile(),		new Tile(TileType.ROADWAY), 						new Tile(TileType.STOP, Rotation.LEFT),
			generateRoadsideTile(), 	new Tile(TileType.STOP, Rotation.UP), 	new Tile(TileType.SIDEWALK_CURVED, Rotation.UP)
		];
	}
	console.error(`Street layout is none of the applicable! Was given: ${situation.streetLayout}`);
}
