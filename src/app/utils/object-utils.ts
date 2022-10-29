import {getRandomIntFromInterval} from './number-utils';

export function getRandomPropertyOfObject(object: Object) {
	const propertyNames = Object.getOwnPropertyNames(object);
	const propertyName = propertyNames[getRandomIntFromInterval(0, propertyNames.length-1)];
	return object[propertyName];
}
