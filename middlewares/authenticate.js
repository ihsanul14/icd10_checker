const { jwt } = require('../helpers');
const { check } = require('./check_user');

module.exports = async (req, res, next) => {
	const { token } = req;
	if (token) {
		try {
			const decoded = jwt.verify(token);

			if (!decoded) {
				next({
					message: 'Incorect access token',
					status: 403
				});
			} else {
				let userExist = await check(req, res, next);

				if (!userExist) {
					next({
						status: 400,
						message: 'Access token not exists'
					});
				} else {
					req.decoded = decoded;

					next();
				}
			}
		} catch (error) {
			const err = {
				status: 400,
				message: 'Not allowed to access'
			};
			console.log(error);
			next(err);
		}
	} else {
		const err = {
			status: 400,
			message: 'Access denied, no token assigned.'
		};
		next(err);
	}
};
