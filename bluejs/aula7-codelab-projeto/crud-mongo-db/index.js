const express = require('express');
const filmeSchema = require('./models/filme');
const mongoose = require('./database');
const { get } = require('express/lib/response');

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

//[POST] /filmes- criar um novo filme
app.post('/filmes', async (req, res) => {
    const filme = req.body;

    if(!filme || !filme.nome || !filme.duracao){
        res.status(400).send({error: 'filme invalido'});
        return;
    }

    const novoFilme = await new filmeSchema(filme).save();
    res.status(201).send({novoFilme});
});

//[PUT] - /filmes/:id - alterar o filme pelo ID
app.put('/filmes/:id', async (req, res) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(422).send({error: 'id invalido'});
        return;
    }

    const filme = await filmeSchema.findById(id);

    if(!filme){
        res.status(404).send({erro: 'filme nao encontrado'});
        return;
    }

    novoFilme = req.body;

    if (!filme || !filme.nome || !filme.duracao) {
        res.status(400).send({ error: "filme invalido" });
        return;
    }

    //procura um document pelo id no banco e altera o docunt inteiro
    await filmeSchema.findOneAndUpdate({_id: id}, novoFilme);
    //busca o document atualizado no banco e insere na const filmeAtualizado
    const filmeAtualizado = await filmeSchema.findById(id);

    res.send({filmeAtualizado});
});

// DELETE - /filmes/:id - remove o filme pelo ID
app.delete('/filmes/:id', async (req, res) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(422).send({error: 'id invalido'});
        return;
    }

    const filme = await filmeSchema.findById(id);

    if(!filme){
        res.status(404).send({erro: 'filme nao encontrado'});
        return;
    }

    await filmeSchema.findByIdAndDelete(id);
    res.send({message: 'filme excluido'});
});


app.listen(port, () => {
    console.log(`server cool in http://localhost:${port}`) 
}); 