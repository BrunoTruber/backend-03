const express = require('express');
const filmeSchema = require('./models/filme');
const mongoose = require('./database')

const app = express();
const port = 3000;
app.use(express.json());

//home
app.get('/', (req, res) => {
    res.send({ info: 'Hello mongo db'});
});

//[GET] /filmes - retorna a lista de filmes
app.get('/filmes', async (req, res) => {
    const filmes = await filmeSchema.find();
    res.send({filmes});
});

//[GET] /filmes/:id - retorna um filme pelo ID
app.get('/filmes/:id', async (req, res) => {
    const id = req.params.id;
//verif
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(422).send({error: 'id invalido'});
        return;
    }

    const filme = await filmeSchema.findById(id);

    if(!filme){
        res.status(404).send({erro: 'filme nao encontrado'})
    }

    res.send({filme});
});


app.listen(port, () => {
    console.log(`server cool in http://localhost:${port}`) 
}); 