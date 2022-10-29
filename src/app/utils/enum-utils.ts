import {getRandomIntFromInterval} from './number-utils';

/**
 * Returns a random enum value of an enum.
 * @param anEnum Reference to the enum type. E.g. for the enum "Dogs" it's just "Dogs"
 * @param startIndex (optional) for when the first value(s) of an enum are for debug purposes.
 */
export function randomEnum<T>(anEnum: T, startIndex = 0): T[keyof T] {
	const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
	const randomIndex = getRandomIntFromInterval(startIndex, enumValues.length-1);
	return enumValues[randomIndex];
}
