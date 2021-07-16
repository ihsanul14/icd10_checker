require('dotenv').config();
const CryptoJS = require('crypto-js');

class Crypto {
	static encrypt(data, key) {
		var secretKey;
		if (key !== undefined) {
			secretKey = key;
		} else {
			secretKey = process.env.SECRET_CRYPTO;
		}

		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();

		return ciphertext;
	}

	static decrypt(data, key) {
		var secretKey;
		if (key !== undefined) {
			secretKey = key;
		} else {
			secretKey = process.env.SECRET_CRYPTO;
		}

		var bytes = CryptoJS.AES.decrypt(data, secretKey);

		var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

		return decryptedData;
	}
}

module.exports = Crypto;
