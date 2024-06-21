// config/db.js

const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs')

dotenv.config();

// Configure connection to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true,
    ca: "certificates/ node app.js   
    node:fs:573
      return binding.open(
                     ^
    
    Error: ENOENT: no such file or directory, open 'C:\Users\sammy\OneDrive\Desktop\TouredIt-1.0\backend_server\database\certificates\us-east-2-bundle.pem' 
        at Object.openSync (node:fs:573:18)
        at Object.readFileSync (node:fs:452:35)
        at Object.<anonymous> (C:\Users\sammy\OneDrive\Desktop\TouredIt-1.0\backend_server\database\db.js:19:12)
        at Module._compile (node:internal/modules/cjs/loader:1358:14)
        at Module._extensions..js (node:internal/modules/cjs/loader:1416:10)
        at Module.load (node:internal/modules/cjs/loader:1208:32)
        at Module._load (node:internal/modules/cjs/loader:1024:12)
        at Module.require (node:internal/modules/cjs/loader:1233:19)
        at require (node:internal/modules/helpers:179:18)
        at Object.<anonymous> (C:\Users\sammy\OneDrive\Desktop\TouredIt-1.0\backend_server\controller\guide_portal.js:6:12) {
      errno: -4058,
      code: 'ENOENT',
      syscall: 'open',
      path: 'certificates/us-east-2-bundle.pem'
    }
    
    Node.js v20.13.1
    PS C:\Users\sammy\OneDrive\Desktop\TouredIt-1.0\backend_server>",
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