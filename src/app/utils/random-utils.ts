import {getRandomDoubleFromInterval} from './number-utils';

export class WeightedObject<T> {
	object: T;
	weight: number;

	constructor(object: T, weight: number) {
		this.object = object;
		this.weight = weight;
	}
}

/**
 * Gets random element from weighted array.
 */
export function getWeightedRandomElement<T>(array: WeightedObject<T>[]): WeightedObject<T> {
	console.log(`array: ${JSON.stringify(array)}`);
	// Example: [{weight:1, object:a},{weight:3, object:b},{weight:2, object:c}]
	// Sum of weights: 1+3+2=6.
	const sumOfAllWeights = array.reduce((previousValue, currentValue) => previousValue + currentValue.weight, 0);
	// Random number between 0 and 6: 4
	const randomWeightValue = getRandomDoubleFromInterval(0, sumOfAllWeights);
	let index = 0;
	console.log(`randomWeightVal: ${randomWeightValue}, cumulativeWeight before loop: ${array[0].weight}, clause: ${array[0].weight < randomWeightValue}`);
	for (let cumulativeWeight = array[0].weight; cumulativeWeight < randomWeightValue; cumulativeWeight+=array[index].weight) {
		index++;
		// Loop 1: cumulativeWeight = 1, index = 1
		// Loop 2: cumulativeWeight+=3 => cumulativeWeight = 4, index = 2 => which is the cumulative weight of elements 0 and 1
		// Loop 3: cumulativeWeight = 4 < 4? nope. No loop entry.
		console.log(`index: ${index}, cumulativeWeight: ${cumulativeWeight}, clause for next run: ${cumulativeWeight < randomWeightValue}`);
	}
	// Returns element on index 2, with cumulative weight of 4.
	return array[index];
}
