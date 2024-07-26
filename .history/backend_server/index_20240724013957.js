const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require('./image/image');

// Routes
const router = require('./router/router');
// Errors
const error_handling = require('./error_handling/error_handling');
const db = require('./database/db');
// Configurations
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer Configuration to use /tmp directory in Lambda
const upload = multer({ dest: '/tmp/uploads/' });

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

app.get('/images/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res).on('error', (err) => {
    console.error('Error streaming file from S3', err);
    res.status(500).send('Error streaming file from S3');
  });
});

app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file;
  try {
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    res.send({ imagePath: `${result.Key}` });
  } catch (err) {
    console.error('Error uploading file', err);
    res.status(500).send('Error uploading file');
  }
});

// Basic welcome test route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use(error_handling);

module.exports.handler = serverless(app);
