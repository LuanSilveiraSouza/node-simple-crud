const nodemailer = require('nodemailer');

class MailSender {
	constructor(credentials = {}) {
		this.transport = nodemailer.createTransport(credentials);
	}

	forgetPasswordMail(mailOptions) {
		this.transport
			.sendMail(mailOptions)
			.then((info) => info.response)
			.catch((error) => error);
	}
}

module.exports = MailSender;
