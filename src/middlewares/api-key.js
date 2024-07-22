async function verifyV1ApiKey(req, res, next) {
	try {
		const apiKey = req.headers["x-api-key"];
		if (!apiKey) {
			return res.status(401).json({
				status: false,
				message: "No API key provided",
			});
		}

		if (process.env.V1_API_KEY !== apiKey) {
			return res.status(401).json({
				status: false,
				message: "Invalid API key",
			});
		}

		next();
	} catch (error) {
		console.log(
			"Server Error in middlewares/api-key.js at verifyV1ApiKey => Error : ",
			error
		);
		return res.status(500).json({
			status: false,
			message: "Internal Server Error! Failed to validate api key",
		});
	}
}

module.exports.verifyV1ApiKey = verifyV1ApiKey