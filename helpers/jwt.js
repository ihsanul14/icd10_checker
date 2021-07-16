require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('./keys/private.key', 'UTF-8');
const publicKey = fs.readFileSync('./keys/public.pem', 'UTF-8');

module.exports = {
	verify: function(token) {
		let verified = jwt.verify(token, publicKey, { algorithms: [ 'RS256' ] });
		return verified;
	},
	sign: function(obj) {
		return jwt.sign(obj, privateKey, { algorithm: 'RS256' });
	}
};
