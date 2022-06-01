const { ContactsModel } = require("./contacts.model");
const { NotFound, Conflict } = require("http-errors");

class ContactsService {
	async create(reqBody) {
		const existingContact = await ContactsModel.findOne({ name: reqBody.name });
		if (existingContact) {
			throw new Conflict("Contact with such name already exists");
		}
    return ContactsModel.create(reqBody);
	}

	async getAll() {
		return ContactsModel.find();
	}

	async getById(id) {
		const contact = await ContactsModel.findById(id);
		if (!contact) {
			throw new NotFound({ message: `Contact with id '${id}' not found` });
		}

		return contact;
	}

	async updateOne(id, updateParams) {
		const contact = await ContactsModel.updateContact(id, updateParams);
		if (!contact) {
			throw new NotFound({ message: `Contact with id '${id}' was not found` });
		}

		return contact;
	}

	async deleteOne(id) {
		const deletedContact = await ContactsModel.findByIdAndDelete(id);
		if (!deletedContact) {
			throw new NotFound({ message: `Contact with id '${id}' was not found` });
		}
	}
}

exports.contactsService = new ContactsService();
