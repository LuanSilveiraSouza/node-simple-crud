const db = require('../database');

class PokemonController {
	list(req, res) {    
		db.query('SELECT * FROM manga' , function (error, results) {
      if (error) throw error;
      const data = results.rows;

      res.render('main', {
        data
      });
    });
	}
}

module.exports = new PokemonController();
