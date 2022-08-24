function returnsThree() {
	return 3;
}

function reciprocal(n) {
	if (n > 1000000 || n < 1) {
		throw new TypeError('Number must be between 1 and 1000000!');
	} else {
		return 1 / n;
	}
}

module.exports = {
	returnsThree,
	reciprocal,
};
