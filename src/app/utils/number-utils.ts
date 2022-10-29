/**
 * Generates random number in an interval
 * @param min Minimum, incl.
 * @param max Maximum, incl.
 */
export function getRandomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
