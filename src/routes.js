const routes = require('express').Router();

const MangaController = require('./controller/MangaController');

routes.get('/manga', MangaController.list);
routes.get('/manga/delete/:id', MangaController.remove);
routes.post('/manga/add', MangaController.create);

module.exports = routes;
