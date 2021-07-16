const { crypto } = require('../helpers');

module.exports = (req, res, next) => {
	const { keysecret } = req.headers;
	if (keysecret !== undefined) {
		let decrypt = crypto.decrypt(keysecret, process.env.SECRET_API);

		let dataJson = JSON.parse(decrypt);

		if (process.env.SECRET_API === dataJson.secret) {
			if (process.env.ALLOWAPP.search(dataJson.appname) > -1) {
				next();
			} else {
				res.status(200).json({
					code: 403,
					message: 'Request from app denied, please check your connection route.'
				});
			}
		} else {
			res.status(200).json({
				code: 400,
				message: "Key is invalid, can't allow to access."
			});
		}
	} else {
		res.status(200).json({
			code: 400,
			message: "Key is invalid, can't allow to access."
		});
	}
};
