// config/db.js

const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();

// Configure connection to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true, // Ensure the server's certificate is verified
    ca: fs.readFileSync(certPath).toString(), // Load the certificate file
  },
});

const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  connect: (callback) => {
    pool.connect(callback);
  },
};

module.exports = db