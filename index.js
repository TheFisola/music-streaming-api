const express = require('express');
const app = express();
const port = require('./config').port;

app.listen(port, () => console.log('App running on port: ', port));
