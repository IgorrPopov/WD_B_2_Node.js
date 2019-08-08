const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middleware/logger');

const PORT = 5000;



app.use(express.static(path.join(__dirname, 'nodeJS')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'nodeJS', 'index.html')));

app.use(logger);

app.all('/request', (req, res) => res.sendStatus(200));



app.listen(PORT, () => console.log('Server started on port: ' + PORT));