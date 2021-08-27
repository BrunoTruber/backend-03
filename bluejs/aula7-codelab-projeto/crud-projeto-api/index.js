//baixar: npm i express
const express = require("express");// importa o módulo express do nde_modules

const jogoSchema = require('./models/jogo');

const app = express();// cria o nosso objeto app, que vai poder utilizar tudo o que o express possui

app.use(express.json());// Converte requisições e repostas para JSON (JavaScript Object Notation)

const port = 3000;

// Função responsável por filtrar apenas os jogos que possuem valores válidos, ou seja, não são null.
const getJogosValidos = () => jogo.filter(Boolean);

// Função responsável por fazer o getById de filmes:
const getJogoById = id => getJogosValidos().find(jogo => jogo.id === id); 

// Função responsável por fazer o getByIndex de filmes:
const getJogoIndexById = id => getJogosValidos().findIndex(jogo => jogo.id === id)

//CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]

//GET- /home - pagina inicial index
app.get('/', (req, res) => {
    // rota de GET, recebe o nome da rota e uma função de callback com requisição ao servidor e resposta do servidor.
    res.status(200).send('Pagina inicial - home')
});

//GET - /jogos - lista todos os jogos
app.get('/jogos', async (req, res) => {
    const jogo = await jogoSchema.find();
    res.send(jogo);
});

//GET - /jogos/{id} - lista os jogos pelo ID
app.get('/jogos/:id', (req, res) => {
     // Rota com recebimento de parametro (:id)
    const id = +req.params.id;
    const jogo = getJogoById(id)

    !jogo
    ? res.status(404).send({ error: "Isto non ecxiste!" })
    : res.send({ jogo });
});
//POST - /jogos - criar um nvo jogo
app.post('/jogos', (req, res) => {
    const jogo = req.body;// Pego o JSON inteiro do body e insiro na const filme (desse lado é convertido para um obejto "normal" de js)

    if (!jogo || !jogo.nome || !jogo.imagem) {
        res.status(400).send({error: "Jogo invalido"});
        return;
    }

    // Pega o último elemento da lista jogos
    const ultimoJogo = jogo[jogo.length - 1];


     // Testa se a lista não está vazia
    if (jogo.length) {// Se o retorno de filmes.length for 0 faça...  (0 == false)
        // Pegar o valor do ultimo id disponivel e somar + 1
        jogo.id = ultimoJogo.id + 1;
        jogo.push(jogo);// Insere o objeto filme no array jogos
    } else {
        // Caso a lista esteja vazia o valor de id é 1
        jogo.id = 1;
        jogo.push(jogo);// Insere o objeto filme no array jogos
    }

    res.status(201).send({jogo});

});

//PUT - /jogos/{id} - alteração de um jogo pelo ID
app.put('/jogos/:id', (req, res) => {
    const id = +req.params.id;

     // findIndex retorna a posição do objeto dentro do array(jogos), caso não exista, retorna -1
    const jogoIndex = getJogoById(id)

    // Validação para verificar se o jogo existe no array
    if (jogoIndex < 0) {
        res.status(404).send({error: "jogo não encontrado."});
        return;
    }

     // Pega o objeto JSON enviado no body da requisição
    const novoJogo = req.body;

    // Valida se todos os campos necessários foram enviados.
    if (!novoJogo || !novoJogo.nome || !novoJogo.imagem) {
        res.status(400).send({ error: "jogo inválido!" });
        return;
    }

    // Procuro o jogo cadastrado no meu array, pelo id passado no parametro, e insiro o objeto inteiro, dentro da const jogo.
    const jogo = getJogoById(id)

    // Adiciona o id do jogo antigo no jogo novo:
    novoJogo.id = jogo.id
    // Insere o jogo novo, na posição encontrada findIndex, do array.
    jogo[jogoIndex] = novoJogo

    res.send('Jogo alterado com sucesso')
});

//DELETE - /jogos/{id} - apaga um jogo pelo ID
app.delete('/jogos/:id', (req, res) => {
    const id = req.params.id;

    const JogoIndex = getJogoIndexById(id)

    if (JogoIndex < 0) {
      res.status(404).send({error: 'jogo nao encontrado'});
      return;
    }


/* O Splice recebe dois parametros, a posição do valor a ser apagada e "quantos"
 valores quero apagar depois desse na minha lista, se eu quiser apagar apenas ele mesmo, colo o numero 1.*/
    jogo.splice(JogoIndex, 1);


    res.send('Jogo apagado com sucesso')
});

/* 
A função listen do objeto app serve para "ligar" o nosso back-end ou servir o nosso back-end
É obrigatório que essa chamada de função esteja SEMPRE no final do nosso código! */
app.listen(port, () => {
    console.log(`Server cool in http://localhost:${port}`);
})