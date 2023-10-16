const express = require('express')
const path = require('path');
const { echo } = require('./utils');

const app = express()
const port = 3000

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/data/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
