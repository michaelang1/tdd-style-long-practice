module.exports = function reverseString(string) {
	if (typeof string !== 'string') {
		throw new TypeError('Give me a string!');
	}

	let reversed = [];

	for (const char of string) {
		reversed.unshift(char);
	}

	return reversed.join('');
};
