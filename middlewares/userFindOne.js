const { Op } = require('sequelize');
const { users, roles, user_details } = require('../models');

module.exports = (req, res, next) => {
	const { username } = req.body;
	const { decoded, params } = req;
	if (!Object.keys(params).length) {
		if (!decoded) {
			if (username === undefined) {
				res.status(400).json({
					code: 403,
					title: 'Warning',
					message: 'Username undefined, check your method',
					type: 'warning'
				});
			}

			users
				.findOne({
					where: {
						[Op.or]: [ { username: username }, { email: username } ]
					},
					include: [ 'role' ]
				})
				.then((user) => {
					if (user !== null) {
						if (user.status === 2) {
							// console.log('ADA USER');
							req.user = user;
							next();
						} else {
							res.status(200).json({
								code: 403,
								title: 'Warning',
								message: 'You have to confirm your account before continuing.',
								type: 'warning'
							});
						}
					} else {
						res.status(200).json({
							code: 404,
							title: 'Warning',
							message: 'The user does not exists.',
							type: 'warning'
						});
					}
				})
				.catch((err) => {
					next(err);
				});
		} else {
			var uname = decoded.username;
			users
				.findOne({
					where: {
						[Op.or]: [ { username: uname }, { email: uname } ]
					},
					include: [ 'role' ]
				})
				.then((user) => {
					if (user !== null) {
						if (user.status === 2) {
							// console.log('ADA USER DECODED');
							req.user = user;
							next();
						} else {
							res.status(200).json({
								code: 403,
								title: 'Warning',
								message: 'You have to confirm your account before continuing.',
								type: 'warning'
							});
						}
					} else {
						res.status(200).json({
							code: 404,
							title: 'Warning',
							message: 'The user does not exists.',
							type: 'warning'
						});
					}
				})
				.catch((err) => {
					next(err);
				});
		}
	} else {
		var uname = params.username;
		users
			.findOne({
				where: {
					username: uname
				},
				include: [ 'role' ]
			})
			.then((user) => {
				if (user !== null) {
					if (user.status === 2) {
						// console.log('ADA USER PARAMS');
						req.user = user;
						next();
					} else {
						res.status(200).json({
							code: 403,
							title: 'Warning',
							message: 'You have to confirm your account before continuing.',
							type: 'warning'
						});
					}
				} else {
					res.status(200).json({
						code: 404,
						title: 'Warning',
						message: 'The user does not exists.',
						type: 'warning'
					});
				}
			})
			.catch((err) => {
				next(err);
			});
	}
};
