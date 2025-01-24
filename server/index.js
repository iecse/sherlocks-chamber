const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    console.log("Hello!!")
    res.send('help')
})

app.listen(PORT, () => {
    console.log(`Server up at PORT: ${PORT}`)
})