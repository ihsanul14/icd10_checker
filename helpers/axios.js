const axios = require('axios');

module.exports = {
	get: (token, data) => {
		try {
			return axios.get(data.url, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
		} catch (error) {
			return { code: 400, error };
		}
	},

	post: (token, data) => {
		try {
			return axios.post(data.url, data.body, {
				headers: {
					Authorization: `Bearer ${token}`,
					inputfrom: data.from
				}
			});
		} catch (error) {
			return { code: 400, error };
		}
	}
};
