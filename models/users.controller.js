const { Router } = require("express");
const { authorize } = require("../middlewares/authorize");
const { catchErrors } = require("../middlewares/catchErrors");
const { compressImage } = require("../middlewares/compressImage");
const { validate } = require("../middlewares/validate");
const { signUpSchema, loginSchema } = require("./users.schemas");
const { usersService } = require("./users.service");
const multer = require("multer");
const mime = require("mime-types");
const uuid = require("uuid");

const router = Router();

const upload = multer({
	storage: multer.diskStorage({
		filename: (req, file, cb) => {
			const extName = mime.extension(file.mimetype);
			const filename = uuid.v4() + "." + extName;
			cb(null, filename);
		},
		destination: "tmp",
	}),
});

router.patch(
	"/avatars",
	authorize,
	upload.single("avatar"),
	compressImage(),
  catchErrors(async (req, res, next) => {
    await usersService.updateAvatar(req);
    res.status(200).send({ avatarURL: req.file.path });
	})
);

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
		const user = await usersService.getCurrentUser(req);
		res.status(200).send(user);
	})
);

router.get(
	"/logout",
	authorize,
	catchErrors(async (req, res, next) => {
		await usersService.logout(req);
		res.status(204).send();
	})
);

exports.usersController = router;
