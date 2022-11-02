/**
 * Generates random number in an interval
 * @param min Minimum, incl.
 * @param max Maximum, incl.
 */
export function getRandomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Modulo operation supporting negative numbers. JS itself says -1%4=-1, but it's rarely useful this way.
 * @param n left hand side of the modulo operation
 * @param m right hand side of the modulo operation
 */
export function betterMod(n, m): number {
	return ((n % m) + m) % m;
}
