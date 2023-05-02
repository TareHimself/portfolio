/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable no-octal */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const util = require('util');
class FLAGS {

	static calcPerm(index) {
		if (index === 0) return 1

		return 2 ** index
	}

	static READ = this.calcPerm(0);
	static WRITE = this.calcPerm(1);
	static DELETE = this.calcPerm(2);
	static UPDATE = this.calcPerm(3);
	static ADMIN = this.calcPerm(4);
	static HYPE_SQUAD = this.calcPerm(5);
	static DEVELOPER = this.calcPerm(6);
	static GAMER = this.calcPerm(7);

}

class FlagsContiainer {

	constructor(initial_flags = 0) {
		this.flags = initial_flags
	}

	has(...testFlags) {
		return testFlags.every(p => Boolean(this.flags & p));
	}

	add(...newFlags) {
		this.flags = newFlags.reduce((flags, p) => p | flags, this.flags)
		return this;
	}

	remove(...removeFlags) {
		this.flags = removeFlags.reduce((flags, p) => flags & (~p), this.flags)
		return this;
	}

	// eslint-disable-next-line no-undef
	[util.inspect.custom]() {
		return this.flags
	}

}

const userFlags = new FlagsContiainer();
console.log(userFlags)
userFlags.add(FLAGS.DELETE, FLAGS.ADMIN, FLAGS.DEVELOPER, FLAGS.GAMER, FLAGS.HYPE_SQUAD, FLAGS.READ)
console.log(userFlags)
console.log("READ", userFlags.has(FLAGS.READ))

console.log("DELETE", userFlags.has(FLAGS.DELETE))

console.log("DEVELOPER", userFlags.has(FLAGS.DEVELOPER))

console.log("GAMER", userFlags.has(FLAGS.GAMER))

console.log("READ", userFlags.has(FLAGS.READ))