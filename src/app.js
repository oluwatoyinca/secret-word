const express = require("express");
const app = express();
const sw = require('./utilities/secretword');

app.use(express.json());

app.post('/secret-words', (req, res) => {
    try {
        sw.validateWordsBox(req)
        sw.checkSecret(req,res)
    } catch(e) {
        res.status(400).json(e)
    }
})

module.exports = app; 