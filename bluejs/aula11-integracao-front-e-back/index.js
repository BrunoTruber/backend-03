const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
require("dotenv").config();

(async () => {
	const dbUser = process.env.DB_USER;
	const dbSenha = process.env.DB_SENHA;
	const dbName = process.env.DB_NAME;
	const dbChar = process.env.DB_CHAR;

	const app = express();
	app.use(express.json());

	const port = process.env.PORT || 3000;
	const connectionString = `mongodb+srv://${dbUser}:${dbSenha}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

	const options = {
		useUnifiedTopology: true,
	};

	const client = await mongodb.MongoClient.connect(connectionString, options);

	const db = client.db("blue_db");
	const personagens = db.collection("personagens");

	const getPersonagensValidas = () => personagens.find({}).toArray();

	const getPersonagemById = async (id) =>
		personagens.findOne({ _id: ObjectId(id) });

	//CORS

	app.all("/personagens", (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");

		res.header("Access-Control-Allow-Methods", "GET");

		res.header(
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
		);

		next();
	});

	app.get("/", (req, res) => {
		res.send({ info: "Olá, Blue" });
	});

	//[GET] GetAllPersonagens

	app.get("/personagens", async (req, res) => {
		res.send(await getPersonagensValidas());
	});

	//[GET] getPersonagemById

	app.get("/personagens/:id", async (req, res) => {
		const id = req.params.id;
		const personagem = await getPersonagemById(id);
		res.send(personagem);
	});
    
    // [POST] postPersonagem - criar personagenm
	app.post("/personagens", async (req, res) => {
		const objeto = req.body;

		if (!objeto || !objeto.nome || !objeto.imagemUrl) {
			res.send(
				"Requisição inválida, certifique-se que tenha os campos nome e imagemUrl"
			);
			return;
		}

		const result = await personagens.insertOne(objeto);

		console.log(result)

		if (result.acknowledged == false) {
			res.send("Ocorreu um erro");
			return;
		}

		res.send(objeto);
	});

	//[PUT] Atualizar personagem
	app.put("/personagens/:id", async (req, res) => {
		const id = req.params.id;
		const objeto = req.body;

		if (!objeto || !objeto.nome || !objeto.imagemUrl) {
			res.send(
				"Requisição inválida, certifique-se que tenha os campos nome e imagemUrl"
			);
			return;
		}

		const quantidadePersonagens = await personagens.countDocuments({
			_id: ObjectId(id),
		});

		if(quantidadePersonagens !== 1){
			res.send('personagem nao encontrado')
		}

		const result = await personagens.updateOne(
			{
				_id: ObjectId(id),
			},
			{
				$set: objeto,
			}
			);
			//console.log(result)
			//se acontecer algum erro no mongodb, cai na seguinte validação
			if(result.modifiedCount !==1){
				res.send('ocorreu um erro ao atualizar o personagem')
			}
	});

	//[DELETE] Deleta um personagem
	app.delete("/personagens/:id", async (req, res) => {
		const id = req.params.id;

		res.send(
			await personagens.deleteOne({
				_id: ObjectId(id),
			})
		);
	});

	app.listen(port, () => {
		console.info(`App rodando em http://localhost:${port}`);
	});
})();