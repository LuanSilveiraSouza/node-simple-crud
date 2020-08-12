const routes = require('express').Router();

const MangaController = require('./controller/MangaController');

routes.get('/', MangaController.list);

module.exports = routes;
