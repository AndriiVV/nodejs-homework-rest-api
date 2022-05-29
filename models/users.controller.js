const { Router } = require("express");
const { authorize } = require("../middlewares/authorize");
const { catchErrors } = require("../middlewares/catchErrors");
const { validate } = require("../middlewares/validate");
const { signUpSchema, loginSchema } = require("./users.schemas");
const { usersService } = require("./users.service");

const router = Router();

router.post(
	"/signup",
	validate(signUpSchema),
  catchErrors(async (req, res, next) => {
		const user = await usersService.signUp(req.body);
		res.status(201).send(user);
	})
);

router.post(
	"/login",
	validate(loginSchema),
	catchErrors(async (req, res, next) => {
		const loginResult = await usersService.login(req.body);
		res.status(200).send(loginResult);
	})
);

router.get(
	"/current",
	authorize,
	catchErrors(async (req, res, next) => {
		const user = await usersService.getCurrentUser(req.userId);
		res.status(200).send(user);
	})
);

router.get(
	"/logout",
	authorize,
	catchErrors(async (req, res, next) => {
		req.logout();
		res.redirect("/");
	})
);

exports.usersController = router;
