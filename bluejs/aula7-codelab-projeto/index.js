const express = require("express");
const app = express();

app.use(express.json());

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

const getJogosValidos = () => jogos.filter(Boolean);

const getJogoById = id => getJogosValidos().find(jogo => jogo.id === id); 

const getJogoIndexById = id => getJogosValidos().findIndex(jogo => jogo.id === id)
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
    const jogo = getJogoById(id)

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
    const id = req.params.id;

    const jogoIndex = getJogoById(id)

    if (jogoIndex < 0) {
        res.status(404).send({error: "jogo não encontrado."});
        return;
    }

    const novoJogo = req.body;

    if (!novoJogo || !novoJogo.nome || !novoJogo.imagem) {
        res.status(400).send({ error: "jogo inválido!" });
        return;
    }

    const jogo = getJogoById(id)

    novoJogo.id = jogo.id
    jogos[jogoIndex] = novoJogo

    res.send('Jogo alterado com sucesso')
});

//DELETE - /jogos/{id} - apaga um jogo pelo ID
app.delete('/jogos/:id', (req, res) => {
    const id = req.params.id;

    const JogoIndex = getjogoIndexById(id)

    if (JogoIndex < 0) {
      res.status(404).send({error: 'jogo nao encontrado'});
      return;
    }


    jogos.splice(JogoIndex, 1);


    res.send('Jogo apagado com sucesso')
});

app.listen(port, () => {
    console.log(`Server cool in http://localhost${port}`);
})