const { Pool } = require("pg");
require("dotenv").config();

const sql = new Pool({
    connectionString: process.env.DB_HOST,
    ssl: { rejectUnauthorized: false }
})

module.exports = sql;