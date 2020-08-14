const db = require('../database');

class PokemonController {
  find(req, res) {
    const { id } = req.params;

    db.query('SELECT * FROM manga WHERE id = $1', [id], function (error, results) {
			if (error) throw error;
			const manga = results.rows;

			res.json({manga});
		});
  }

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
    publish_year_date.setTime(publish_year_date.getTime() + (1000 * 60 * 60 * 24))
    
		db.query(
			'INSERT INTO manga(title, author, publish_year) VALUES($1, $2, $3)',
			[title, author, publish_year_date],
			(error) => {
        if (error) throw error;
        res.redirect('/manga');
      }
		);
  }
  
  remove(req, res) {
    const { id } = req.params;

    db.query(
			'DELETE FROM manga WHERE id = $1',
			[id],
			(error) => {
        if (error) throw error;
        res.redirect('/manga');
      }
		);
  }

  update(req, res) {
    const { id } = req.params;
    const { title, author, publish_year } = req.body;

    const publish_year_date = new Date(publish_year);
    publish_year_date.setTime(publish_year_date.getTime() + (1000 * 60 * 60 * 24))

    db.query(
			'UPDATE manga SET title = $1, author = $2, publish_year = $3 WHERE id = $4',
			[title, author, publish_year_date, id],
			(error) => {
        if (error) throw error;
        res.redirect('/manga');
      }
		);
  }
}

module.exports = new PokemonController();