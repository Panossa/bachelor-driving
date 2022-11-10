/**
 * Generates random INTEGER in an interval
 * @param min Minimum, incl.
 * @param max Maximum, incl.
 */
export function getRandomIntFromInterval(min: number, max: number): number {
	return Math.floor(getRandomDoubleFromInterval(min, max));
}

/**
 * Generates random DOUBLE in an interval
 * @param min Minimum, incl.
 * @param max Maximum, incl.
 */
export function getRandomDoubleFromInterval(min: number, max: number): number {
	const temp = Math.random() * (max - min + 1) + min;
	return Math.min(max, temp);
}

/**
 * Modulo operation supporting negative numbers. JS itself says -1%4=-1, but it's rarely useful this way.
 * @param n left hand side of the modulo operation
 * @param m right hand side of the modulo operation
 */
export function betterMod(n, m): number {
	return ((n % m) + m) % m;
}

export function clamp(number, min, max) {
	return Math.max(min, Math.min(number, max));
}
