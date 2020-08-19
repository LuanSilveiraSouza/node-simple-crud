const { validationResult } = require('express-validator');

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
      res.redirect('/register');
    }

    /*
    await db.query('INSERT INTO "user"(name, username, password, email, role) VALUES($1, $2, $3, $4, $5)',
    [name, username, password, email, 'USER'])
    */
    res.redirect('/login');
  }
}

module.exports = new SessionController();