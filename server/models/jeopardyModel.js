const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env['PGURI'];

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: async (text, params, callback) => {
    const client = await pool.connect();
    let res;

    try{
      await client.query('BEGIN');
      res = await client.query(text, params, callback);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      console.error(e);
    } finally {
      console.log('Database connection disconnected')
      client.release();
    }
    return res;
  }
}

