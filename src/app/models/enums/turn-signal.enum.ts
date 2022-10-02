import {DriveDirections} from './drive-direction.enum';

export enum TurnSignals {
	NONE,
	LEFT,
	RIGHT,
	BOTH
}

export function mapToTurnSignal(driveDirection: DriveDirections): TurnSignals {
	switch (driveDirection) {
		case DriveDirections.RIGHT:
			return TurnSignals.RIGHT;
		case DriveDirections.LEFT:
			return TurnSignals.LEFT;
		case DriveDirections.FORWARD:
			return TurnSignals.NONE;
		case DriveDirections.NONE:
			console.error('"None" drive direction given to mapToTurnSignal!');
			return TurnSignals.NONE;
	}
}
