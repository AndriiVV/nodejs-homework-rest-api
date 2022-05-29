const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
	},
	subscription: {
		type: String,
		enum: ["starter", "pro", "business"],
		default: "starter",
	},
	token: {
		type: String,
		default: null,
	},
});

usersSchema.statics.updateUser = (id, updateParams) => {
	return this.UsersModel.findByIdAndUpdate(id, updateParams);
};

exports.UsersModel = model("User", usersSchema);