const { Pool } = require('pg');

// Conexión a PostgreSQL desde Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
