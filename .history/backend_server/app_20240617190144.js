const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

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

