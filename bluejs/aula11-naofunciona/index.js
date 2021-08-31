const express = require('express');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
require ('dotenv').config();

(async () => {
    const dbhost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbName = process.env.DB_NAME;

    const app = express();
    app.use(express.json());
    const port = process.env.PORT || 3000;
    const connectionString = `mongodb://${dbhost}:${dbPort}/${dbName}`;

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