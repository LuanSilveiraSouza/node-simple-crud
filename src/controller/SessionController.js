const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const db = require('../database');

class SessionController {
  renderLanding(req, res) {
    res.render('landing');
  }

  renderLogin(req, res) {
    res.render('login');
  }

  renderRegister(req, res) {
    res.render('register');
  }

  async registerUser(req, res) {
    const { name, username, password, repeat_password, email} = req.body;

    const errors = validationResult(req).errors;

    if(errors.length > 0) {
      console.log(errors);
      return res.redirect('/register');
    }

    const saltRounds = 8;

    const hashed_password = await bcrypt.hash(password, saltRounds);
    
    await db.query('INSERT INTO "user"(name, username, password, email, role) VALUES($1, $2, $3, $4, $5)',
    [name, username, hashed_password, email, 'USER'])

    return res.redirect('/login');
  }

  async loginUser(req, res) {
    const { username, password } = req.body;

    const results = await db.query('SELECT username, password from "user" WHERE username = $1', [username]);
    const user = results.rows[0];

    if(!user) {
      console.log('Usuário não encontrado');
    } else {
      const password_match = await bcrypt.compare(password, user.password);
      
      if(password_match) {
        console.log('Autenticado');
      }
    }

    return res.redirect('/login');
  }
}

module.exports = new SessionController();