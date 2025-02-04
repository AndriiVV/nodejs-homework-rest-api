const { Router } = require("express");
const { validate } = require("../middlewares/validate");
const {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
} = require("./contacts.schemas");
const { contactsService } = require("./contacts.service");
const { catchErrors } = require("../middlewares/catchErrors");
const { authorize } = require("../middlewares/authorize");

const router = Router();

router.get(
	"/",
	catchErrors(async (req, res, next) => {
		const contacts = await contactsService.getAll();
		res.status(200).send(contacts);
	})
);

router.get(
	"/:id",
	catchErrors(async (req, res, next) => {
		const contact = await contactsService.getById(req.params.id);
		res.status(200).send(contact);
	})
);

router.post(
  "/",
  authorize,
	validate(createContactSchema),
  catchErrors(async (req, res, next) => {
    const contact = await contactsService.create({ ...req.body, owner: req.userId });
		res.status(201).send(contact);
	})
);

router.put(
	"/:id",
	validate(updateContactSchema),
	catchErrors(async (req, res, next) => {
		const owner = req.userId;
		const contact = await contactsService.updateOne(
			req.params.id,
			req.body,
			owner
		);
		res.status(200).send(contact);
	})
);

router.patch(
	"/:id/favorite",
	validate(updateFavoriteSchema),
	catchErrors(async (req, res, next) => {
		const contact = await contactsService.updateOne(req.params.id, req.body);
		res.status(200).send(contact);
	})
);

router.delete(
	"/:id",
	catchErrors(async (req, res, next) => {
		await contactsService.deleteOne(req.params.id);
		res.status(204).send();
	})
);

exports.contactsController = router;
