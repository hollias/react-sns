const express = require('express');

const db = require('./models');

const app = express();
db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('hello, server');
});

app.get('/about', (req, res) => {
    res.send('hello, about');
});

app.listen(8080, () => {
    console.log('server is running on http://localhost:8080');
});