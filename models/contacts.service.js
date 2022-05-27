const Contacts = require("./mongoSchemas");

const listContacts = () => {
	return Contacts.find();
};

const getContactById = (contactId) => {
	return Contacts.findOne({ _id: contactId });
};

const addContact = ({ name, email, phone }) => {
	return Contacts.create({ name, email, phone });
};

const removeContact = (contactId) => {
	return Contacts.findByIdAndRemove({ _id: contactId });
};

const updateContact = (contactId, fields) => {
	return Contacts.findByIdAndUpdate({ _id: contactId }, fields);
};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
};
