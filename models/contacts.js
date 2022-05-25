const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
	try {
		const data = await fs.readFile(contactsPath);
		const result = JSON.parse(data);
		// console.log(result);
		return result;
	} catch (err) {
		err.message = "listContacts error";
		throw new Error(err.message);
	}
};

const getContactById = async (contactId) => {
	try {
		const data = await fs.readFile(contactsPath);
		const result = JSON.parse(data).filter((el) => el.id === contactId);
		return result;
	} catch (err) {
		err.message = "getContactById error";
		throw new Error(err.message);
	}
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();

	if (contacts.findIndex((el) => el.id === contactId) === -1) {
		return console.log("Unable to remove non-exist contactId");
	}

	const contactsList = [...contacts].filter(({ id }) => id !== contactId);

	try {
		await fs.writeFile(contactsPath, JSON.stringify(contactsList));
		return console.log("contactId removed");
	} catch (err) {
		err.message = "removeContact error";
		throw new Error(err.message);
	}
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = {
		id: 0,
		name: body.name,
		email: body.email,
		phone: body.phone,
	};
	const contactsList = [...contacts, newContact].map(
		({ name, email, phone }, index) => ({
			id: `${index + 1}`,
			name,
			email,
			phone,
		})
	);

	try {
		await fs.writeFile(contactsPath, JSON.stringify(contactsList));
		return contactsList[contactsList.length - 1];
	} catch (err) {
		err.message = "addContact error";
		throw new Error(err.message);
	}
};

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();

	const contactsList = contacts.map((el) =>
		el.id === contactId
			? { ...el, name: body.name, email: body.email, phone: body.phone }
			: el
	);

	try {
		await fs.writeFile(contactsPath, JSON.stringify(contactsList));
	} catch (err) {
		err.message = "addContact error";
		throw new Error(err.message);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
