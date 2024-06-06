const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


// Middleware
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware');

// Configurations
dotenv.config();

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
dbConfig.connect((err) => {
  if (err) {
    console.error('PostgreSQL connection failed', err);
    process.exit(1);
  }
  console.log('Connected to PostgreSQL database successfully');
});

// Routes
a

// basic welcome test route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use(errorHandlingMiddleware);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});