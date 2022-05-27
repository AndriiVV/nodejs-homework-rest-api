const mongoose = require("mongoose");
const contactsSchema = mongoose.Schema;

const contacts = new contactsSchema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
			minlength: 5,
			maxlength: 70,
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

const Contacts = mongoose.model("contacts", contacts);

module.exports = Contacts;
