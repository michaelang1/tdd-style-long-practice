const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);

const Person = require('../problems/person');

describe('Person class', () => {
	let person1;

	const noNameAge = { no: 'name', no: 'age' };
	const noName = { no: 'name', age: 33 };
	const noAge = { name: 'Michael', no: 'age' };
	const nameAge = { name: 'Lucy', age: 25 };

	beforeEach(() => {
		person1 = new Person('Michael', 33);
	});

	let person2 = new Person('David', 30);
	let person3 = new Person('Lily', 45);

	describe('Person constructor', () => {
		it('Person should have name property and set it correctly', () => {
			expect(person1).to.have.property('name');
			expect(person1.name).to.eql('Michael');
		});

		it('Person should have age property and set it correctly', () => {
			expect(person1).to.have.property('age');
			expect(person1.age).to.eql(33);
		});
	});

	describe('sayHello() instance method', () => {
		it('should return name plus a greeting message', () => {
			const greeting = person1.sayHello();
			expect(greeting).to.eql(`Hi ${person1.name}, welcome to Westworld`);
		});
	});

	describe('visit(otherPerson) instance method', () => {
		it('should return string where current instance visited passed-in instance', () => {
			const visit = person1.visit(person2);
			expect(visit).to.eql(`${person1.name} visited ${person2.name}`);
		});
	});

	describe('switchVisit(otherPerson) instance method', () => {
		it('should return string where passed-in instance visited current instance', () => {
			const visit = person1.switchVisit(person2);
			expect(visit).to.eql(`${person2.name} visited ${person1.name}`);
		});

		it('should call the visit method of the passed-in instance', () => {
			const mySpy = chai.spy.on(person2, 'visit');
			person1.switchVisit(person2);
			expect(mySpy).to.have.been.called();
		});
	});

	describe('update(obj) instance method', () => {
		context('input is not a valid object', () => {
			it('should throw TypeError with clear message if input is not an object', () => {
				expect(() => person1.update(3)).throw(
					TypeError,
					'Give me an object!'
				);
				expect(() => person1.update([1, 2])).throw(
					TypeError,
					'Give me an object!'
				);
				expect(() => person1.update(true)).throw(
					TypeError,
					'Give me an object!'
				);
			});

			it('should throw TypeError with clear message if input object has no name and age property', () => {
				expect(() => person1.update(noNameAge)).throw(
					TypeError,
					'Object must have name and age property!'
				);

				expect(() => person1.update(noName)).throw(
					TypeError,
					'Object must have name and age property!'
				);

				expect(() => person1.update(noAge)).throw(
					TypeError,
					'Object must have name and age property!'
				);
			});
		});

		context('input is a valid object', () => {
			it('should update current instance properties to match input object', () => {
				person1.update(nameAge);
				expect(person1.name).to.eql('Lucy');
				expect(person1.age).to.eql(25);
			});
		});
	});

	describe('tryUpdate(obj) instance method', () => {
		context(
			'the update instance method is not successfully invoked',
			() => {
				it('should invoke update method and return false if input is not object', () => {
					const mySpy = chai.spy.on(person1, 'update');
					expect(person1.tryUpdate(3)).to.be.false;
					expect(mySpy).to.have.been.called();
				});

				it('should invoke update method and return false if input object has no name and age property', () => {
					const mySpy = chai.spy.on(person1, 'update');
					expect(person1.tryUpdate(noName)).to.be.false;
					expect(mySpy).to.have.been.called();
				});
			}
		);

		context('the update instance method is successfully invoked', () => {
			it('should invoke update method and return true', () => {
				const mySpy = chai.spy.on(person1, 'update');
				expect(person1.tryUpdate(nameAge)).to.be.true;
				expect(mySpy).to.have.been.called();
			});

			it('should update current instance properties to match input instance', () => {
				person1.tryUpdate(nameAge);
				expect(person1.name).to.eql('Lucy');
				expect(person1.age).to.eql(25);
			});
		});
	});

	describe('greetAll(obj) static method', () => {
		it('should call sayHello instance method on each instance', () => {
			const mySpy1 = chai.spy.on(person1, 'sayHello');
			const mySpy2 = chai.spy.on(person2, 'sayHello');
			const mySpy3 = chai.spy.on(person3, 'sayHello');

			Person.greetAll([person1, person2, person3]);

			expect(mySpy1).to.have.been.called.once;
			expect(mySpy2).to.been.called.once;
			expect(mySpy3).to.been.called.once;
		});

		it('should return an array with strings returned from sayHello instance method', () => {
			let greetings = Person.greetAll([person1, person2, person3]);

			expect(greetings).to.eql([
				`Hi ${person1.name}, welcome to Westworld`,
				`Hi ${person2.name}, welcome to Westworld`,
				`Hi ${person3.name}, welcome to Westworld`,
			]);
		});
	});
});
