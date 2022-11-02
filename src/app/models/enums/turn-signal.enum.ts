import {GridPosition} from './grid-position.enum';
import {betterMod} from '../../utils/number-utils';

export enum TurnSignal {
	NONE,
	LEFT,
	RIGHT,
	BOTH
}

export function mapGridPositionsToTurnSignal(gridPositionOrigin: GridPosition, gridPositionTarget: GridPosition): TurnSignal {
	if (gridPositionOrigin === GridPosition.CENTER || gridPositionTarget === GridPosition.CENTER) {
		console.error("Tried mapping unsupported gridPosition to TurnSignal!");
		return TurnSignal.NONE;
	}

	if (gridPositionTarget == betterMod(gridPositionOrigin - 1, 4)) {
		return TurnSignal.LEFT;
	}
	if (gridPositionTarget == betterMod(gridPositionOrigin + 1, 4)) {
		return TurnSignal.RIGHT;
	}
	return TurnSignal.NONE;
}
