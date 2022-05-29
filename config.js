exports.getConfig = () => {
	const { PORT, DB_HOST, BCRYPT_SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN } =
		process.env;

	return {
		port: PORT,
    database: { url: DB_HOST },
    bcrypt: { saltRounds: parseInt(BCRYPT_SALT_ROUNDS) },
    jwt: {secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN},
	};
};
