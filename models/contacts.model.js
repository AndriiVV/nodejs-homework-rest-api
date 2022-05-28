const { Schema, model } = require("mongoose");

const contactsSchema = new Schema({
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
});

contactsSchema.statics.updateContact = (id, updateParams) => {
	return this.ContactsModel.findByIdAndUpdate(id, updateParams, {
		favorite: true,
	});
};

exports.ContactsModel = model("Contact", contactsSchema);
