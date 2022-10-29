import {getRandomIntFromInterval} from './number-utils';

export function removeDuplicatesFilter(value, index, self) {
	return self.indexOf(value) === index;
}

/**
 * Removes all occurrences of elements from arrayA in arrayB
 */
export function removeElementsOfAFromB(arrayA, arrayB) {
	for (let i = arrayB.length-1; i >= 0; i--) {
		const subject = arrayB[i];
		if (arrayA.includes(subject)) {
			arrayB.splice(i, 1);
		}
	}
}


export function getRandomObjectOfArray<T>(array: T[]): T {
	return array[getRandomIntFromInterval(0, array.length-1)];
}
