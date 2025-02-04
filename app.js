const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");

const { getConfig } = require("./config");
const { contactsController } = require("./models/contacts.controller");
const { usersController } = require("./models/users.controller");

class ContactsServer {
	#app;
	#config;

	async start() {
		this.#initServer();
		this.#initConfig();
		await this.#initDatabase();
		this.#initMiddlewares();
		this.#initRoutes();
		this.#initErrorHandling();
		this.#startListening();
	}

	#initServer() {
		this.#app = express();
	}

	#initConfig() {
		const envPath = path.join(__dirname, "./.env");
		dotenv.config({ path: envPath });
		this.#config = getConfig();
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	}

  	async #initDatabase() {
		try {
			await mongoose.connect(this.#config.database.url);
			console.log("Database connection successful");
		} catch (err) {
			console.log("Database connection error", err);
			process.exit(1);
		}
	}

	#initMiddlewares() {
		this.#app.use(express.json());
		this.#app.use(morgan("combined"));
		this.#app.use("/public", express.static(__dirname + "/public"));
	}

	#initRoutes() {
		this.#app.use("/users", usersController);
		this.#app.use("/api/contacts", contactsController);
	}

	#initErrorHandling() {
		this.#app.use((err, req, res, next) => {
			const statusCode = err.status || 500;

			if (statusCode >= 500) {
				console.log(err);
			}

			res.status(statusCode).send(err.message);
		});
	}

	#startListening() {
		this.#app.listen(this.#config.port, () => {
			console.log("Server started listening on port", this.#config.port);
		});
	}
}

module.exports.ContactsServer = ContactsServer;
