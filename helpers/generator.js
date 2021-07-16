const randomstring = require('randomstring');

const dict = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
const passwordArray = Array.apply(null, Array(10));
const password = () => passwordArray.map((item) => dict[Math.round(Math.random() * (dict.length - 1))]).join('');
const login_pin = () =>
	randomstring.generate({
		length: 6,
		charset: 'numeric'
	});
const username = (input) => input.slice(0, input.indexOf('@'));
const auth_key = randomstring.generate({
	length: 70,
	charset: 'alphanumeric'
});
const verification_token = randomstring.generate({
	length: 100,
	charset: 'alphanumeric'
});
const password_reset_token = randomstring.generate({
	length: 100,
	charset: 'alphanumeric'
});
const plain_password = randomstring.generate(8);
const scheduler_id = randomstring.generate(10);
const access_token = () => Math.round(Math.random() * 89999) + 10000;
const feedback = randomstring.generate({
	length: 12,
	charset: 'numeric'
});
const referral = (length) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const shortNumber = (num, digits) => {
	var si = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'k' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' }
	];
	var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var i;
	for (i = si.length - 1; i > 0; i--) {
		if (num >= si[i].value) {
			break;
		}
	}
	return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

module.exports = {
	plain_password,
	password,
	login_pin,
	auth_key,
	verification_token,
	password_reset_token,
	access_token,
	username,
	feedback,
	scheduler_id,
	referral,
	shortNumber
};
