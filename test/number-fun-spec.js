const { expect } = require('chai');
const { returnsThree, reciprocal } = require('../problems/number-fun');

describe('returnsThree(num)', () => {
	it('should return number 3', () => {
		expect(returnsThree()).to.eql(3);
	});
});

describe('reciprocal(num)', () => {
	context('with valid input', () => {
		it('should return the reciprocal of input number', () => {
			let num1 = 5;
			let num2 = 8 / 3;
			expect(reciprocal(num1)).to.eql(0.2);
			expect(reciprocal(num2)).to.eql(3 / 8);
		});
	});

	context('with invalid input (out of range)', () => {
		it('should throw a TypeError if input is out of range', () => {
			expect(() => reciprocal(0)).to.throw(TypeError);
			expect(() => reciprocal(-5)).to.throw(TypeError);
			expect(() => reciprocal(1000001)).to.throw(TypeError);
		});
	});
});
