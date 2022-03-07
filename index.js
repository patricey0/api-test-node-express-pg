require('dotenv').config();

const express = require('express');

const cors = require('cors');

//importing router
const router = require('./app/router');

//import localhost port from config
const { port } = require('./app/config/devEnv');

// express server init
const app = express();

//json config
app.use(express.json());

app.use(cors());

//using router
app.use(router);

//server listening
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;