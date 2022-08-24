class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	sayHello() {
		return `Hi ${this.name}, welcome to Westworld`;
	}

	visit(otherPerson) {
		return `${this.name} visited ${otherPerson.name}`;
	}

	switchVisit(otherPerson) {
		return otherPerson.visit(this);
	}

	update(obj) {
		if (typeof obj !== 'object' || Array.isArray(obj)) {
			throw new TypeError('Give me an object!');
		} else if (!obj.name || !obj.age) {
			throw new TypeError('Object must have name and age property!');
		} else {
			this.name = obj.name;
			this.age = obj.age;
		}
	}

	tryUpdate(obj) {
		try {
			this.update(obj);
			return true;
		} catch {
			return false;
		}
	}

	static greetAll(people) {
		let greetings = [];
		for (const person of people) {
			greetings.push(person.sayHello());
		}
		return greetings;
	}
}

module.exports = Person;
