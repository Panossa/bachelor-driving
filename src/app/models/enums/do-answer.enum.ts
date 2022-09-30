/**
 * Usage: "Ich" + answer + "."
 * Might be used to concatenate answers like:
 * "Ich" + "bleibe stehen" + "und" + "hupe" + "."
 */
export enum DoAnswer {
	EMERGENCY_BRAKE="mache eine Vollbremsung",
	STAY="bleibe stehen",
	DECELERATE="werde langsamer",
	KEEP_SPEED="fahre gleichbleibend weiter",
	ACCELERATE="beschleunige",
	HONK="hupe",
	STALEMATE="verständige mich mit den anderen Verkehrsteilnehmern, um zu klären, wer fahren darf, da den Regeln zufolge niemand Vorfahrt hat"
	// Theoretically also possible: rare actions like driving over train tracks.
	// TODO decide whether ALL possible actions need to be included in each circ as that might get very big. Probably not, though.
}
