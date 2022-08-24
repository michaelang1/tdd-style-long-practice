function myMap(inputArray, callback) {
	let newArr = [];

	inputArray.forEach(el => {
		newArr.push(callback(el));
	});

	return newArr;

	// return inputArray.map(el => callback(el)); for test to not invoke Array#map
}

module.exports = myMap;
