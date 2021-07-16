const fs = require('fs');
const nodemailer = require('nodemailer');
const mustache = require('mustache');
const mailer = require('../config/mailer');

module.exports = (mailOptions) => {
	var host, port, email, pass;
	if (mailOptions.app !== 'ittp') {
		host = mailer.sehatri.noreply.host;
		port = mailer.sehatri.noreply.port;
		email = mailer.sehatri.noreply.email;
		pass = mailer.sehatri.noreply.password;
	} else {
		host = mailer.ittpcovid.noreply.host;
		port = mailer.ittpcovid.noreply.port;
		email = mailer.ittpcovid.noreply.email;
		pass = mailer.ittpcovid.noreply.password;
	}
	const transporter = nodemailer.createTransport({
		host: host,
		port: port,
		auth: {
			user: email,
			pass: pass
		}
	});

	var template = fs.readFileSync('./html/' + mailOptions.app + '/' + mailOptions.template + '.html', 'utf8');

	const mail = {
		to: mailOptions.to,
		from: `"No Reply "<${email}>`,
		subject: mailOptions.subject,
		html: mustache.render(template, { ...mailOptions })
	};
	return new Promise((resolve, reject) => {
		transporter.verify(function(error, success) {
			if (error) {
				return reject(error);
			} else {
				transporter.sendMail(mail, (err, info) => {
					if (err) {
						return reject(err);
					}
					return resolve(info);
				});
			}
		});
	});
};
