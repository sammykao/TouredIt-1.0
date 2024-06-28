const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

// Routes
const router = require('./router/router');
// Errors
const error_handling = require('./error_handling/error_handling');
const db = require('./database/db');
// Configurations
dotenv.config();

const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Connect to PostgreSQL db
db.connect((err) => {
  if (err) {
    console.error('PostgreSQL connection failed', err);
    process.exit(1);
  }
  console.log('Connected to PostgreSQL database successfully');
});

// Routes
app.use('/api', router);

// basic welcome test route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use(error_handling);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports.handler = serverless(app);
