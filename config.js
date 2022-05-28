exports.getConfig = () => {
	const { PORT, DB_HOST } = process.env;

	return {
		port: PORT,
		database: { url: DB_HOST },
	};
};
