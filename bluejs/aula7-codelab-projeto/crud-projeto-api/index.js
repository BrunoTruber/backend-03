//baixar: npm i express
const express = require("express");// importa o módulo express do nde_modules
const app = express();// cria o nosso objeto app, que vai poder utilizar tudo o que o express possui

app.use(express.json());// Converte requisições e repostas para JSON (JavaScript Object Notation)

const port = 3000;

const jogos = [
    {
        id: 1,
        nome: "The Legend of Zelda: Ocarina of Time",
        imagem: "https://s2.glbimg.com/yV_0o8QppB4pGaoRnv5k45oW1JA=/0x0:695x420/984x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2016/09/27/nintendo-64-20-anos-the-legend-of-zelda-ocarina-of-time.jpg"
    },
    {
        id: 2,
        nome: "Tony Hawk's Pro Skater 2",
        imagem: "https://s2.glbimg.com/26R0yT2Dk_W-lTmlCh6Xq66AMJY=/0x0:850x638/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/k/1/Y6JlcIR4Cs0BABE5Rmtg/thps2-3.png"
    },
    {
        id: 3,
        nome: "Grand Theft Auto IV",
        imagem: "https://s2.glbimg.com/7ODOiSf9y_Fuv5UcQDPISeVcQpg=/0x0:695x434/984x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2015/07/08/gta-iv-steam1.jpg"
    },
    {   
        id: 4,
        nome: "SoulCalibur",
        imagem: "https://s2.glbimg.com/CHiQlb-KUkeUouRfkvANLOHcV4o=/0x0:555x370/984x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2013/11/29/soulcalibur-game-001.jpg"
    },
    {
        id: 5,
        nome: "Super Mario Galaxy",
        imagem: "https://s2.glbimg.com/npRJ-WEPP3zEWhr694SHlBuK2ww=/0x0:695x417/984x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2015/03/20/mario-galaxy.jpg"
    },
    {
        id: 6,
        nome: "Super Mario Galaxy 2",
        imagem: "https://s2.glbimg.com/7CVjMbiGVJBYwvywH4LCeo8cMpo=/0x0:695x390/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/c/P/5EPwo9Q6OB8cdNzpHJqw/evolucao-games-2010-2020-10-super-mario-galaxy-2.jpg"
    },
    {   
        id: 7,
        nome: "Red Dead Redemption 2",
        imagem: "https://s2.glbimg.com/05LkMmL7utHLmjaCefLYm1tqIzM=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/Y/u/4O9gicQly5pkDiZ3tPww/reddead2.jpeg"
    },
    {   
        id: 8,
        nome: "Grand Theft Auto V",
        imagem: "https://s2.glbimg.com/1H0VJPjSTx0bePl7Ulxs94I2knQ=/0x0:3840x2160/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/2/A/tpqOWNQ1a6wQo6MRIDeQ/gtav.jpeg"
    },
    {   
        id: 9,
        nome: "The Legend of Zelda: Breath of the Wild",
        imagem: "https://s2.glbimg.com/cMN7MrLpoTZV1GMUBYdgL30bVv8=/0x0:2560x1440/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/O/S/BPIs44QMm6D82ZbljLNQ/zelda.jpeg"
    },
    {   
        id: 10,
        nome: "Tony Hawk's Pro Skater 3 ",
        imagem: "https://s2.glbimg.com/UAKsbIzwuDcE6ZzVTeggm41C01A=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/7/T/BpMzkKRnSh3RGxJaZfKQ/c0gwynkji2mcuvz410g8.jpg"
    }
];

// Função responsável por filtrar apenas os filmes que possuem valores válidos, ou seja, não são null.
const getJogosValidos = () => jogos.filter(Boolean);

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
app.get('/jogos', (req, res) => {
    res.json({jogos})// .json converte nosso array ou objeto para JSON
});

//GET - /jogos/{id} - lista os jogos pelo ID
app.get('/jogos/:id', (req, res) => {
     // Rota com recebimento de parametro (:id)
    const id = +req.params.id;
    const jogo = getJogoById(id)

    !jogo
    ? res.status(404).send({ error: "Isto non ecxiste!" })
    : res.json({ jogo });
});
//POST - /jogos - criar um nvo jogo
app.post('/jogos', (req, res) => {
    const jogo = req.body;// Pego o JSON inteiro do body e insiro na const filme (desse lado é convertido para um obejto "normal" de js)

    if (!jogo || !jogo.nome || !jogo.imagem) {
        res.status(400).send({error: "Jogo invalido"});
        return;
    }

    // Pega o último elemento da lista jogos
    const ultimoJogo = jogos[jogos.length - 1];


     // Testa se a lista não está vazia
    if (jogos.length) {// Se o retorno de filmes.length for 0 faça...  (0 == false)
        // Pegar o valor do ultimo id disponivel e somar + 1
        jogo.id = ultimoJogo.id + 1;
        jogos.push(jogo);// Insere o objeto filme no array jogos
    } else {
        // Caso a lista esteja vazia o valor de id é 1
        jogo.id = 1;
        jogos.push(jogo);// Insere o objeto filme no array jogos
    }

    res.status(201).send({jogo});

});

//PUT - /jogos/{id} - alteração de um jogo pelo ID
app.put('/jogos/:id', (req, res) => {
    const id = req.params.id;

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
    jogos[jogoIndex] = novoJogo

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
    jogos.splice(JogoIndex, 1);


    res.send('Jogo apagado com sucesso')
});

/* 
A função listen do objeto app serve para "ligar" o nosso back-end ou servir o nosso back-end
É obrigatório que essa chamada de função esteja SEMPRE no final do nosso código! */
app.listen(port, () => {
    console.log(`Server cool in http://localhost:${port}`);
})