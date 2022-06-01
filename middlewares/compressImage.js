// const { catchErrors } = require("./catchErrors");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;
const DESTINATION = "public/avatars";

exports.compressImage = () => {
	return async (req, res, next) => {
		const initialFilePath = req.file.path;
		const compressedFilePath = path.join(DESTINATION, req.file.filename);
		const file = await Jimp.read(initialFilePath);

		await file.resize(250, 250).writeAsync(compressedFilePath);

		req.file.path = compressedFilePath;
		req.file.destination = DESTINATION;

		await fs.unlink(initialFilePath);

		next();
	};
};
