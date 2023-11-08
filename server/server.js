const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
const configureDb = require('./config');

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
configureDb();

const router = require('./routes/router')
app.use('/api', router)

// Serve static files from the 'uploads' directory
app.use(express.static('./uploads'));

app.listen( process.env.PORT || 4000, () => {
  console.log(`Server is running!`);
});