const routes = require('express').Router();

const MangaController = require('./controller/MangaController');
const SessionController = require('./controller/SessionController');
const FormValidator = require('./middlewares/FormValidator');
const Auth = require('./middlewares/Auth');

routes.get('/', SessionController.renderLanding);
routes.get('/login', SessionController.renderLogin);
routes.post(
	'/user/login',
	FormValidator.validateUserLogin(),
	SessionController.loginUser
);
routes.get('/register', SessionController.renderRegister);
routes.post(
	'/user/add',
	FormValidator.validateUserRegister(),
	SessionController.registerUser
);
routes.post('/user/password', SessionController.forgetPassword);

routes.get('/manga', Auth.verifyToken, MangaController.list);
routes.get('/manga/:id', Auth.verifyToken, MangaController.find);
routes.get('/manga/delete/:id', Auth.verifyToken, MangaController.remove);
routes.post('/manga/add', Auth.verifyToken, MangaController.create);
routes.post('/manga/update/:id', Auth.verifyToken, MangaController.update);

module.exports = routes;
