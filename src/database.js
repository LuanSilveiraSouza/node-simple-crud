const { Pool } = require('pg');

const db = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'dockerpostgres',
  database: 'postgres',
  port: 5432
});

module.exports = db;
