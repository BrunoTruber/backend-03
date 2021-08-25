const express = require("express");
const app = express();

app.use(express.json());

const port = 3000;

const jogos = [
    {
        id: 1,
        nome: "",
        imagem: ""
    },
    {
        id: 2,
        nome: "",
        imagem: ""
    },
    {
        id: 3,
        nome: "",
        imagem: ""
    },
    {   id: 4,
        nome: "",
        imagem: ""
    },
    {
        id: 5,
        nome: "",
        imagem: ""
    },
    {
        id: 6,
        nome: "",
        imagem: ""
    },
    {        id: 7,
        nome: "",
        imagem: ""
    },
    {        id: 8,
        nome: "",
        imagem: ""
    },
    {        id: 9,
        nome: "",
        imagem: ""
    },
    {        id: 10,
        nome: "",
        imagem: ""
    }
];

//CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]


//GET- /home - pagina inicial index
app.get('/', (req, res) => {
    res.status(200).send('Pagina inicial - home')
});

//GET - /jogos - lista todos os jogos
app.get('/jogos', (req, res) => {
    res.json({jogos})
});

//GET - /jogos/{id} - lista os jogos pelo ID
app.get('/jogos/:id', (req, res) => {
    const id = +req.params.id;
    const jogo = jogos.find((jogo) => jogo.id === id);

    !jogo
    ? res.status(404).send({ error: "Isto non ecxiste!" })
    : res.json({ jogo });
});
//POST - /jogos - criar um nvo jogo
app.post('/jogos', (req, res) => {
    const jogo = req.body;

    if (!jogo || !jogo.nome || !jogo.imagem) {
        res.status(400).send({error: "Jogo invalido"});
        return;
    }

    const ultimoJogo = jogos[jogos.length - 1];


    if (jogos.length) {
        jogo.id = ultimoJogo.id + 1;
        jogos.push(jogo);
    } else {
        jogo.id = 1;
        jogos.push(jogo);
    }

    res.status(201).send({jogo});

});

//PUT - /jogos/{id} - alteração de um jogo pelo ID
app.put('/jogos/:id', (req, res) => {
    const id = req.params.id - 1;
    const jogo = req.body.jogo;
    jogos[id] = jogo;
    res.send('Jogo alterado com sucesso')
});

//DELETE - /jogos/{id} - apaga um jogo pelo ID
app.delete('/jogos/:id', (req, res) => {
    const id = req.params.id - 1;
    delete jogos[id];
    res.send('Jogo apagado com sucesso')
});

app.listen(port, () => {
    console.log(`Server cool in http://localhost${port}`);
})