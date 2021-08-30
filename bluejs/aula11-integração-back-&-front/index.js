const express = require('express');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

(async () => {

    const app = express();
    app.use(express.json());
    const port = 3000;
    const connectionString = `mongodb://lo0calhost:27017/blue_db`

    const options = {
        useUnifiedTopology: true,
    }

    const client = await mongodb.MongoClient.connect(connectionString, options);

    const db = client.db('blue_db');
    const personagens = db.collections('personagens')

    const getPersonagensValidos = () => personagens.find({}).toArray();

    const getPersonagemById = async(id) => personagens.findOne({_id: ObjectId(id)});

    app.get('/', (req, res) => {
        res.send({ info: 'ola mundo'})
    });

    app.get('/personagens', async (req, res) => {
        res.send(await getPersonagensValidos());
    });





    app.listen(port, () => {
         console.info(`app rodando em http://localhost:${port}`)
    });
})();