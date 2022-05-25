const express = require("express");
const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
} = require("../../models/contacts");
const { validate } = require("../../middlewares/validate");
const {
	createContactSchema,
	updateContactSchema,
} = require("../../models/schemas");

const router = express.Router();

router.get("/", async (req, res, next) => {
	const contacts = await listContacts();
	res.status(200).send(contacts);
});

router.get("/:id", async (req, res, next) => {
	const contact = await getContactById(req.params.id);
	if (!contact.length) {
		res.status(404).send("Not found");
	} else {
		res.status(200).send(contact);
	}
});

router.post("/", validate(createContactSchema), async (req, res, next) => {
	const contact = await addContact(req.body);
	res.status(201).send(contact);
});

router.delete("/:id", async (req, res, next) => {
	const deletedId = await removeContact(req.params.id);
	if (!deletedId) {
		res.status(404).send("Not found");
	} else {
		res.status(200).send("Contact deleted");
	}
});

router.put("/:id", validate(updateContactSchema), async (req, res, next) => {
	const contact = await updateContact(req.params.id, req.body);
	if (!contact) {
		res.status(404).send("Not found");
	} else {
		res.status(200).send(contact);
	}
});

module.exports = router;
