const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Routes
const router = require('./router/router')
// Middleware
const error_handling = require('./error_hadnling/error_handling')

// Configurations
dotenv.config();
const db = require('./database/db');

const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors middleware config
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

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
