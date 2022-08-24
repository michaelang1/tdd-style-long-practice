const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

const myMap = require('../problems/my-map');

describe('myMap(inputArray, callback)', () => {
	let arr;
	const callback = el => el * 2;

	beforeEach(() => {
		arr = [1, 3, 2];
	});

	it('should return an array where callback is called on each element', () => {
		let newArr = myMap(arr, callback);
		expect(newArr).to.eql([2, 6, 4]);
	});

	it('should not mutate the input array', () => {
		let newArr = myMap(arr, callback);
		expect(newArr).to.eql([2, 6, 4]);
		expect(arr).to.eql([1, 3, 2]);
	});

	it('should not call built-in Array#map method', () => {
		// const spy = chai.spy.on(arr, 'map'); // or this works as well:
		const spy = chai.spy.on(Array.prototype, 'map');
		myMap(arr, callback);
		expect(spy).to.not.have.been.called();
	});

	it('should invoke callback once for each element of input array', () => {
		const spy = chai.spy(callback);
		myMap(arr, spy);
		expect(spy).to.have.been.called.exactly(3);
	});
});
