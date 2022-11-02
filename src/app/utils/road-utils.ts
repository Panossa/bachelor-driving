import {GridPosition} from '../models/enums/grid-position.enum';
import {TrafficSubject} from '../models/traffic-subject';
import {TurnSignal} from '../models/enums/turn-signal.enum';
import {Situation} from '../models/situation';
import {Tile} from '../models/tile';
import {STREET_LAYOUTS} from '../models/street-layout';
import {TileType} from '../models/tile-type.enum';
import {Rotation} from '../models/enums/rotation.enum';

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
	// TODO use betterMod() with case gridPosition - 2 % 4 to make this a one-liner
	switch (subject.gridPosition) {
		case GridPosition.RIGHT:
			return !remainingTrafficSubjects.find(otherSubject =>
				otherSubject.gridPosition === GridPosition.LEFT
				&& otherSubject.turnSignal !== TurnSignal.LEFT
			);
		case GridPosition.BOTTOM:
			return !remainingTrafficSubjects.find(otherSubject =>
				otherSubject.gridPosition === GridPosition.TOP
				&& otherSubject.turnSignal !== TurnSignal.LEFT
			);
		case GridPosition.LEFT:
			return !remainingTrafficSubjects.find(otherSubject =>
				otherSubject.gridPosition === GridPosition.RIGHT
				&& otherSubject.turnSignal !== TurnSignal.LEFT
			);
		case GridPosition.TOP:
			return !remainingTrafficSubjects.find(otherSubject =>
				otherSubject.gridPosition === GridPosition.BOTTOM
				&& otherSubject.turnSignal !== TurnSignal.LEFT
			);
		default:
			console.error(`Invalid grid position of traffic subject ${subject}`);
	}
}

export function getRoadsideTile(rotation: Rotation): Tile {
	return new Tile(Math.random()<0.5 ? TileType.HOUSE : TileType.SIDEWALK_STRAIGHT, rotation);
}

export function generateRoadTiles(situation: Situation): Tile[] {
	if (situation.streetLayout === STREET_LAYOUTS.STRAIGHT_ROAD) {
		return [
			new Tile(TileType.SIDEWALK_STRAIGHT), new Tile(TileType.ROAD_STRAIGHT), new Tile(TileType.SIDEWALK_STRAIGHT, Rotation.LEFT),
			new Tile(TileType.SIDEWALK_STRAIGHT), new Tile(TileType.ROAD_STRAIGHT), new Tile(TileType.SIDEWALK_STRAIGHT, Rotation.LEFT),
			new Tile(TileType.SIDEWALK_STRAIGHT), new Tile(TileType.ROAD_STRAIGHT), new Tile(TileType.SIDEWALK_STRAIGHT, Rotation.LEFT)
		];
	}
	if (situation.streetLayout === STREET_LAYOUTS.FULL_CROSSING) {
		return [
			new Tile(TileType.SIDEWALK_CURVED, Rotation.DOWN), 		new Tile(TileType.STOP, Rotation.DOWN), new Tile(TileType.SIDEWALK_CURVED, Rotation.LEFT),
			new Tile(TileType.STOP, Rotation.RIGHT), 							new Tile(TileType.ROADWAY), 						new Tile(TileType.STOP, Rotation.LEFT),
			new Tile(TileType.SIDEWALK_CURVED, Rotation.RIGHT), 	new Tile(TileType.STOP, Rotation.UP), 	new Tile(TileType.SIDEWALK_CURVED, Rotation.UP)
		];
	}
	if (situation.streetLayout === STREET_LAYOUTS.T_CROSSING_LEFT_FORWARD) {
		return [
			new Tile(TileType.SIDEWALK_CURVED, Rotation.DOWN), 		new Tile(TileType.STOP, Rotation.DOWN), new Tile(TileType.SIDEWALK_STRAIGHT, Rotation.LEFT),
			new Tile(TileType.STOP, Rotation.RIGHT), 							new Tile(TileType.ROADWAY), 						new Tile(TileType.SIDEWALK_STRAIGHT, Rotation.LEFT),
			new Tile(TileType.SIDEWALK_CURVED, Rotation.RIGHT), 	new Tile(TileType.STOP, Rotation.UP), 	new Tile(TileType.SIDEWALK_STRAIGHT, Rotation.LEFT)
		];
	}
	if (situation.streetLayout === STREET_LAYOUTS.T_CROSSING_LEFT_RIGHT) {
		return [
			new Tile(TileType.SIDEWALK_STRAIGHT, Rotation.DOWN),	new Tile(TileType.SIDEWALK_STRAIGHT, Rotation.DOWN), 	new Tile(TileType.SIDEWALK_STRAIGHT, Rotation.DOWN),
			new Tile(TileType.STOP, Rotation.RIGHT), 							new Tile(TileType.ROADWAY), 													new Tile(TileType.STOP, Rotation.LEFT),
			new Tile(TileType.SIDEWALK_CURVED, Rotation.RIGHT), 	new Tile(TileType.STOP, Rotation.UP), 								new Tile(TileType.SIDEWALK_CURVED, Rotation.UP)
		];
	}
	if (situation.streetLayout === STREET_LAYOUTS.T_CROSSING_RIGHT_FORWARD) {
		return [
			new Tile(TileType.SIDEWALK_STRAIGHT), 	new Tile(TileType.STOP, Rotation.DOWN), new Tile(TileType.SIDEWALK_CURVED, Rotation.LEFT),
			new Tile(TileType.SIDEWALK_STRAIGHT),		new Tile(TileType.ROADWAY), 						new Tile(TileType.STOP, Rotation.LEFT),
			new Tile(TileType.SIDEWALK_STRAIGHT), 	new Tile(TileType.STOP, Rotation.UP), 	new Tile(TileType.SIDEWALK_CURVED, Rotation.UP)
		];
	}
	console.error(`Street layout is none of the applicable! Was given: ${situation.streetLayout}`);
}
