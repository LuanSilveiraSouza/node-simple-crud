const db = require('../database');

class PokemonController {
	constructor() {
		db.connect();
	}

	list(req, res) {
		let data;

		db.query('SELECT * FROM pokemon', function (error, results, fields) {
			if (error) throw error;
			console.log(results[0]);
      data = results[0];
		});
		console.log(data);

		db.end();

		res.render('hello', {
			data: {nome: 'Pikachu', level: 100}
		});
	}
}

module.exports = new PokemonController();
