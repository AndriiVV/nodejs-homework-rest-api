const { catchErrors } = require("./catchErrors");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { getConfig } = require("../config");

exports.authorize = catchErrors((req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization || "";
		const token = authorizationHeader.replace("Bearer ", "");
		const config = getConfig();
		const payload = jwt.verify(token, config.jwt.secret);
		req.userId = payload.sub;

		next();
	} catch (err) {
		throw new Unauthorized({ message: "Not authorized" });
	}
});
