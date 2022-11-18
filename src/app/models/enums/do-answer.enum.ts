/**
 * Usage: "Ich" + answer + "."
 * Might be used to concatenate answers like:
 * "Ich" + "bleibe stehen" + "und" + "hupe" + "."
 */
export enum DoAnswer {
	START_DRIVING="fahre los",
	EMERGENCY_BRAKE="mache eine Vollbremsung",
	STAY="bleibe stehen",
	OVERTAKE="überhole",
	DO_NOT_OVERTAKE="überhole nicht",
	DECELERATE="werde langsamer",
	KEEP_SPEED="fahre gleichbleibend weiter",
	ACCELERATE="beschleunige",
	HONK="hupe",
	STALEMATE="kommuniziere per Handzeichen mit den anderen Verkehrsteilnehmern, um zu klären, wer fährt"
	// Theoretically also possible: rare actions like driving over train tracks.
}
