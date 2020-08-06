const routes = require('express').Router();

routes.get('/', (req, res) => {
	res.render('hello');
});

//model: abstração das tabelas do BD no código
//view: visualização que retornaremos (HTML, CSS)
//controller: cuida da parte lógica

module.exports = routes;
