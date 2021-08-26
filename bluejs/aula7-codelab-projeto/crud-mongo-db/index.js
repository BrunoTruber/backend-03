const express = require('express');
const mongoose = require('mongoose');
const filmeSchema = require('./models/filme');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ info: 'Hello mongo db'});
});

app.get('/filmes', (req, res) => {
    const filmes = await filmeSchema.find();
    res.send(filmes);
})

app.listen(port, () => {
    console.log(`server cool in http://localhost${port}`)
}); 