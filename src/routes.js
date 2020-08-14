const routes = require('express').Router();

const MangaController = require('./controller/MangaController');

routes.get('/manga', MangaController.list);
routes.get('/manga/:id', MangaController.find);
routes.get('/manga/delete/:id', MangaController.remove);
routes.post('/manga/add', MangaController.create);
routes.post('/manga/update/:id', MangaController.update);

module.exports = routes;
