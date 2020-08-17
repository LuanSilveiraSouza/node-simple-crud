const db = require('../database');

class Manga {
	static async findOne(id = 0) {
		const results = await db.query('SELECT * FROM manga WHERE id = $1', [id]);

		return results.rows[0];
	}

	static async findAll() {
		const data = await db.query('SELECT * FROM manga');
		return data.rows;
	}

	static async create(title = '', author = '', synopsis = '', publish_year = new Date()) {
		await db.query(
			'INSERT INTO manga(title, author, synopsis, publish_year) VALUES($1, $2, $3, $4)',
			[title, author, synopsis, publish_year]
		);
	}

	static async removeOne(id = 0) {
		await db.query('DELETE FROM manga WHERE id = $1', [id]);
	}

	static async updateOne(id, title, author, synopsis, publish_year) {
		await db.query(
			'UPDATE manga SET title = $1, author = $2, synopsis = $3, publish_year = $4 WHERE id = $5',
			[title, author, synopsis, publish_year, id]
		);
	}
}

module.exports = Manga;
