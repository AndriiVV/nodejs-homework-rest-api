// const { Router } = require("express");
// const { catchErrors } = require("../middlewares/catchErrors");
// const { validate } = require("../middlewares/validate");
// const { signUpSchema, loginSchema } = require("./auth.schemas");
// const { usersService } = require("./auth.service");

// const router = Router();

// router.post(
// 	"/users/signup",
// 	validate(signUpSchema),
// 	catchErrors(async (req, res, next) => {
// 		const user = await usersService.signUp(req.body);
// 		res.status(201).send(user);
// 	})
// );

// router.post(
// 	"/users/login",
// 	validate(loginSchema),
// 	catchErrors(async (req, res, next) => {
// 		const loginResult = await authService.signIn(req.body);
// 		res.status(201).send(loginResult);
// 	})
// );

// exports.usersRouter = router;
