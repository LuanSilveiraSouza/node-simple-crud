
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
}

module.exports = new SessionController();