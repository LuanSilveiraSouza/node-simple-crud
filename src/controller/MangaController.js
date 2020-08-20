const db = require('../database');
const Manga = require('../model/Manga');

class PokemonController {
  async find(req, res) {
    const { id } = req.params;

    const manga = await Manga.findOne(id, req.userId);

    res.render('manga-detail', {
      manga
    });
  }

	async list(req, res) {
    const data = await Manga.findAll(req.userId);
    
    res.render('manga-list', {
      data
    });
	}

	async create(req, res) {
    const { title, author, synopsis, publish_year } = req.body;

    const publish_year_date = new Date(publish_year);
    publish_year_date.setTime(publish_year_date.getTime() + (1000 * 60 * 60 * 24))
    
    await Manga.create(title, author, synopsis, publish_year_date, req.userId);

    res.redirect('/manga');
  }
  
  async remove(req, res) {
    const { id } = req.params;

    await Manga.removeOne(id);
    
    res.redirect('/manga');
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, author, synopsis, publish_year } = req.body;

    const publish_year_date = new Date(publish_year);
    publish_year_date.setTime(publish_year_date.getTime() + (1000 * 60 * 60 * 24))

    await Manga.updateOne(id, title, author, synopsis, publish_year_date);

    res.redirect('/manga');
  }
}

module.exports = new PokemonController();
