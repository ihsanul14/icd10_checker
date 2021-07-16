const axios = require('axios');

const get = (url, token) => {
	return new Promise((resolve, reject) => {
		try {
			return axios
				.get(url, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((result) => {
					if (result.data.code === 200) {
						resolve(result.data);
					} else {
						reject(result.data);
					}
				})
				.catch((error) => {
					reject(error);
				});
		} catch (error) {
			reject(error);
		}
	});
};

const check = async (req, res, next) => {
	let data = await get(`${process.env.USER_REST}/user/check/exist`, req.token);
	if (data.code !== 200) {
		return false;
	} else {
		return true;
	}
};

module.exports = {
	check
};
