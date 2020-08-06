const routes = require('express').Router();

const PokemonController = require('./controller/PokemonController');

routes.get('/', PokemonController.list);

//model: abstração das tabelas do BD no código
//view: visualização que retornaremos (HTML, CSS)
//controller: cuida da parte lógica

module.exports = routes;
