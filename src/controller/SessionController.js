require('dotenv').config();
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../database');
const MailSender = require('../utils/MailSender');

class SessionController {
	renderLanding(req, res) {
    res.clearCookie('token');
		res.render('landing');
	}

	renderLogin(req, res) {
		res.render('login');
	}

	renderRegister(req, res) {
		res.render('register');
	}

	async registerUser(req, res) {
		const { name, username, password, repeat_password, email } = req.body;

		const errors = validationResult(req).errors;

		if (errors.length > 0) {
			console.log(errors);
			return res.redirect('/register');
    }
    
    const results = await db.query(
			'SELECT username, email FROM "user" WHERE username = $1 OR email = $2',
			[username, email]
		);
    const userExists = results.rows[0];

    if(userExists) {
      console.log('Nome de Usuário ou Email já cadastrado');
      return res.redirect('/register');
    }

		const saltRounds = 8;

		const hashed_password = await bcrypt.hash(password, saltRounds);

		await db.query(
			'INSERT INTO "user"(name, username, password, email, role) VALUES($1, $2, $3, $4, $5)',
			[name, username, hashed_password, email, 'USER']
		);

		return res.redirect('/login');
	}

	async loginUser(req, res) {
    const { username, password } = req.body;

    const errors = validationResult(req).errors;

		if (errors.length > 0) {
			console.log(errors);
			return res.redirect('/login');
    }

		const results = await db.query(
			'SELECT username, password from "user" WHERE username = $1',
			[username]
		);
		const user = results.rows[0];

		if (!user) {
			console.log('Usuário não encontrado');
		} else {
			const password_match = await bcrypt.compare(password, user.password);

			if (password_match) {
        const token = await jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: 3600 });

        res.cookie('token', token, { httpOnly: true });
        
        return res.redirect('/manga');
			}
		}

		return res.redirect('/login');
  }
  
  async forgetPassword(req, res) {
    const { username, email } = req.body;

    const results = await db.query(
			'SELECT id, username, email from "user" WHERE username = $1 AND email = $2',
			[username, email]
		);
		const user = results.rows[0];

    if (!user) {
			console.log('Usuário não encontrado');
		} else {
			const mailCredentials = {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      };

      const mailSender = new MailSender(mailCredentials);

      const mailOptions = {
        from: process.env.MAIL_EMAIL,
        to: user.email,
        subject: 'Recuperação de Senha',
        text: `${user.username}, ${user.email}`
      }

      const response = await mailSender.forgetPasswordMail(mailOptions);

      console.log(response);
		}

    return res.redirect('/login');
  }
}

module.exports = new SessionController();
