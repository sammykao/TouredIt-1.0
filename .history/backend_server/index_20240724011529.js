const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors middleware
const bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getFileStream } = require('./image/image')

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

app.get('/images/:key', (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
})

app.post('/images', upload.single('image'), async (req,res) => {
  console.log(file);
  const file = req.file;
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  const description = req.body.description;
  res.send({imagePath: `${result.Key}`});
})

// basic welcome test route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(error_handling);

module.exports.handler = serverless(app);
