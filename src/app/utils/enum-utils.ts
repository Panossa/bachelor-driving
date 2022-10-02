import {randomIntFromInterval} from './number-utils';

export function randomEnum<T>(anEnum: T, startIndex = 0): T[keyof T] {
	const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
	const randomIndex = randomIntFromInterval(startIndex, enumValues.length-1);
	return enumValues[randomIndex];
}
