const CRUD = require('../helpers/crud');
const { access_controls } = require('../models');

module.exports = (resource, attribute) => {
	return (req, res, next) => {
		const { decoded } = req;

		CRUD.readDetail(access_controls, {}, { user_id: decoded.id, resource, attribute }, {}, {}, (data) => {
			if (data.code === 200) {
				next();
			} else {
				res.status(403).json({
					code: 403,
					message: "User can't access"
				});
			}
		});
	};
};
