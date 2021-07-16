const axios = require('axios');

class Institution {
	static getInstitution(id, token) {
		return new Promise((resolve, reject) => {
			try {
				return axios
					.get(`${process.env.INSTITUTION_REST}/institution/detail`, {
						params: { id: id },
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then((result) => {
						if (result.data.code === 200) {
							resolve(result.data);
						} else {
							resolve(result.data);
						}
					})
					.catch((error) => {
						console.log(error);
						reject(error);
					});
			} catch (error) {
				console.log(error);
				reject({ code: 400, error });
			}
		});
	}
}

module.exports = Institution;
