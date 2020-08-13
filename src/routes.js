const routes = require('express').Router();

const MangaController = require('./controller/MangaController');

routes.get('/', MangaController.list);
routes.post('/add-manga', MangaController.create);

module.exports = routes;
