export function removeDuplicatesFilter(value, index, self) {
	return self.indexOf(value) === index;
}

/**
 * Removes all occurrences of elements from arrayA in arrayB
 */
export function removeElementsOfAFromB(arrayA, arrayB) {
	arrayB.forEach((subject, index) => {
		if (arrayA.includes(subject)) {
			arrayB.splice(index, 1);
		}
	});
}
