const { UsersModel } = require("./users.model");
const { NotFound, Conflict, Forbidden, Unauthorized } = require("http-errors");
const { getConfig } = require("../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UsersService {
	async signUp(userParams) {
		const { email, password } = userParams;
		const existingUser = await UsersModel.findOne({ email });
		if (existingUser) {
			throw new Conflict("User with such email already exists");
		}
		const createdUser = await UsersModel.create({
			email,
			password: await this.#hashPassword(password),
		});

		return {
			user: {
				email: createdUser.email,
				subscription: createdUser.subscription,
			},
		};
	}

	async login(credentials) {
		const { email, password } = credentials;

		const user = await UsersModel.findOne({ email });
		if (!user) {
			throw new Unauthorized({ message: "Email or password is wrong" });
		}
		const isPasswordCorrect = await this.#isPasswordCorrect(
			password,
			user.password
		);
		if (!isPasswordCorrect) {
			throw new Unauthorized({ message: "Email or password is wrong" });
		}

    const token = this.#generateToken(user.id);
    await UsersModel.findOneAndUpdate({ email }, { token });
		return {
			token,
			user: { email: user.email, subscription: user.subscription },
		};
	}

	async getCurrentUser(userId) {
		const user = await UsersModel.findById(userId);
		if (!user) {
			throw new Unauthorized({ message: "Not authorized" });
		}

		return { email: user.email, subscription: user.subscription };
	}

	async #hashPassword(password) {
		const config = getConfig();
		return bcrypt.hash(password, config.bcrypt.saltRounds);
	}

	async #isPasswordCorrect(password, passwordHash) {
		return bcrypt.compare(password, passwordHash);
	}

	#generateToken(userId) {
		const config = getConfig();
		return jwt.sign({ sub: userId }, config.jwt.secret, {
			expiresIn: config.jwt.expiresIn,
		});
	}
}

exports.usersService = new UsersService();
