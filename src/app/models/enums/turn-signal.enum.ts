import {GridPosition} from './grid-position.enum';

export enum TurnSignal {
	NONE,
	LEFT,
	RIGHT,
	BOTH
}

export function mapGridPositionsToTurnSignal(gridPositionOrigin: GridPosition, gridPositionTarget: GridPosition): TurnSignal {
	console.log(`Mapping grid positions ${gridPositionOrigin} and ${gridPositionTarget} to turn signal`);
	if ((gridPositionOrigin === GridPosition.BOTTOM && gridPositionTarget === GridPosition.RIGHT)
		|| (gridPositionOrigin === GridPosition.RIGHT && gridPositionTarget === GridPosition.TOP)
		|| (gridPositionOrigin === GridPosition.TOP && gridPositionTarget === GridPosition.LEFT
		|| (gridPositionOrigin === GridPosition.LEFT && gridPositionTarget === GridPosition.BOTTOM))
	) {
		return TurnSignal.RIGHT;
	}

	if ((gridPositionOrigin === GridPosition.BOTTOM && gridPositionTarget === GridPosition.TOP)
		|| (gridPositionOrigin === GridPosition.TOP && gridPositionTarget === GridPosition.BOTTOM
		|| (gridPositionOrigin === GridPosition.RIGHT && gridPositionTarget === GridPosition.LEFT)
			|| (gridPositionOrigin === GridPosition.LEFT && gridPositionTarget === GridPosition.RIGHT))
	) {
		return TurnSignal.NONE;
	}

	if ((gridPositionOrigin === GridPosition.BOTTOM && gridPositionTarget === GridPosition.LEFT)
		|| (gridPositionOrigin === GridPosition.RIGHT && gridPositionTarget === GridPosition.BOTTOM)
		|| (gridPositionOrigin === GridPosition.TOP && gridPositionTarget === GridPosition.RIGHT
			|| (gridPositionOrigin === GridPosition.LEFT && gridPositionTarget === GridPosition.TOP))
	) {
		return TurnSignal.LEFT;
	}
}
