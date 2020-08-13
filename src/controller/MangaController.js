const db = require('../database');

class PokemonController {
	list(req, res) {
		db.query('SELECT * FROM manga', function (error, results) {
			if (error) throw error;
			const data = results.rows;

			res.render('main', {
				data
			});
		});
	}

	create(req, res) {
    const { title, author, publish_year } = req.body;
    const publish_year_date = new Date(publish_year);
    
		db.query(
			'INSERT INTO manga(title, author, publish_year) VALUES($1, $2, $3)',
			[title, author, publish_year_date],
			(error) => {
        if (error) throw error;
        res.redirect('/');
      }
		);
  }
  
}

module.exports = new PokemonController();
