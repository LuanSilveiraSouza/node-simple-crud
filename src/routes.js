const routes = require('express').Router();

const MangaController = require('./controller/MangaController');
const SessionController = require('./controller/SessionController');
const FormValidator = require('./middlewares/FormValidator');

routes.get('/', SessionController.renderLanding);
routes.get('/login', SessionController.renderLogin);
routes.get('/register', SessionController.renderRegister);
routes.post(
	'/user/add',
	FormValidator.validateUserRegister(),
	SessionController.registerUser
);

routes.get('/manga', MangaController.list);
routes.get('/manga/:id', MangaController.find);
routes.get('/manga/delete/:id', MangaController.remove);
routes.post('/manga/add', MangaController.create);
routes.post('/manga/update/:id', MangaController.update);

module.exports = routes;
