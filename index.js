const express = require('express');
const route = require('./routes/route.js')
const app = express();

app.get("/", route.index);

app.listen(3000);
