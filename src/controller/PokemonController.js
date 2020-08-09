const db = require('../database');

class PokemonController {
	list(req, res) {    
		db.query('SELECT * FROM pokemon' , function (error, results) {
      if (error) throw error;
      const data = results.rows;

      res.render('hello', {
        data
      });
    });
	}
}

module.exports = new PokemonController();
