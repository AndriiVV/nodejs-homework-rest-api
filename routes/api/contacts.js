const express = require("express");
const router = express.Router();

const ctrlContact = require("../../models/contacts.controller");

const { validate } = require("../../middlewares/validate");
const {
	createContactSchema,
	updateContactSchema,
} = require("../../models/schemas");

router.get("/", ctrlContact.getAll);

router.get("/:id", ctrlContact.getById);

router.post("/", validate(createContactSchema), ctrlContact.add);

router.delete("/:id", ctrlContact.remove);

router.put("/:id", validate(updateContactSchema), ctrlContact.update);

router.patch(
	"/:id/favorite",
	validate(updateContactSchema),
	ctrlContact.updateFavorite
);

module.exports = router;
