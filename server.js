const mongoose = require("mongoose");

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
	// promiseLibrary: global.Promise,
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true,
	// useFindAndModify: false,
});

// console.log("PORT: ", PORT);
// console.log("uriDb: ", uriDb);
// console.log("connection: ", connection);

connection
	.then(() => {
		app.listen(PORT, function () {
			console.log(`Server running. Use our API on port: ${PORT}`);
		});
	})
	.catch((err) =>
		console.log(`Server not running. Error message: ${err.message}`)
	);

