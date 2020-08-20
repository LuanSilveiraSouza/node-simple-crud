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
		const { name, username, password, email } = req.body;

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
			'SELECT name, username, email from "user" WHERE username = $1 AND email = $2',
			[username, email]
		);
		const user = results.rows[0];

    if (!user) {
			console.log('Usuário não encontrado');
		} else {
      const token = await jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: 600 });

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
        html: `<h1>Olá, ${user.name}</h1>
        <p>O link para recuperar a senha de sua conta no YourManga é este:</p>
        <a href="http://localhost:${process.env.PORT || 3000}/recoverpassword/${token}">Recuperar Senha</a>
        <p>Caso você não tenha solicitado a recuperação de senha, sugerimos imediatamente a troca de senha.</p>
        <br/>
        <p><strong>Atenciosamente, Equipe YourManga</strong></p>`
      }

      const response = await mailSender.forgetPasswordMail(mailOptions);
		}

    return res.redirect('/login');
  }

  async recoverPassword(req, res) {
    const { token } = req.params;

    if(!token) {
      console.log('Token not provided');
      return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
      if(error) {
        console.log('Token expired');
        return res.redirect('/login');
      }
      
      if(!result) {
        console.log('Invalid Token');
        return res.redirect('/login');
      }

      return res.render('recover-password', {username: result.username, email: result.email});
    });
  }

  async updatePassword(req, res) {
    const { email, password } = req.body;

    const errors = validationResult(req).errors;

		if (errors.length > 0) {
			console.log(errors);
			return res.redirect('/login');
    }

    const saltRounds = 8;

		const hashed_password = await bcrypt.hash(password, saltRounds);

		await db.query(
			'UPDATE "user" SET password = $1 WHERE email = $2',
			[hashed_password, email]
		);

		return res.redirect('/login');
  }
}

module.exports = new SessionController();
