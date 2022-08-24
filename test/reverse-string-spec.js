const { expect } = require('chai');
const reverseString = require('../problems/reverse-string');

describe('reverseString(string)', () => {
	it('should return a new string with letters reversed', () => {
		const str = 'fun';
		expect(reverseString(str)).to.eql('nuf');
	});

	it('should throw TypeError if input is not string', () => {
		const num = 25;
		const arr = ['not', 'a', 'str'];
		const obj = { I: 'am', not: 'string' };
		const boolean = true;

		expect(() => reverseString(num)).to.throw(TypeError);
		expect(() => reverseString(arr)).to.throw(TypeError);
		expect(() => reverseString(obj)).to.throw(TypeError);
		expect(() => reverseString(boolean)).to.throw(TypeError);
	});
});
