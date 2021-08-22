const express = require('express');
const app = express();

app.use(express.json()) // Converter requisiçao para JavaScript Object Notation (JSON)
 
const filmes = [
  'Capitao America',
  'Capitã Marvel',
  'pantera negra'
]

// CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]

//GET /home
app.get('/', (req, res) => {
  res.send('Hello World Express');
});

//GET /filmes - retornar a lista de filmes
app.get('/filmes',(re, res) => {
  res.send(filmes);
});
 
  //GET /filmes/{id} - retorna a lista de filmes pelo ID
app.get('/filmes/:id', (req, res) => {
  const id = req.params.id - 1; //pega o parametro da rota
  const filme = filmes[id] //a variavel filme recebe o parametro e busca na lista filmes
  
  !filme ? 
  res.send('filme nao existe')
  : res.send(filme) //aqui retorna o filme
});

// POST - /filmes - Criar um novo filme
app.post('/filmes', (req, res) => {
  const filme = req.body.filme;
  // if( filme == 'Matrix'){
  //   res.send(filme)
  // } else {
  //   res.send('Nao é Matrix')
  // }
  filmes.push(filme)
  res.send('filme adicionado com sucesso')
});

// PUT - /filmes/{id} - altera um filme elo ID
app.put('/filmes/:id', (req, res) => {
  const id = req.params.id - 1;
  const filme = req.body.filme;
  filmes[id] = filme
  res.send('filme alterado com sucesso');
});

// Delete - /filmes/{id} - apagar filmes pelo id
app.delete('/filmes/:id', (req, res) => {
  const id = req.params.id - 1;
  const filme = req.body.filme;
  filmes[id] = filme
  res.send('filme apagado com sucesso');
});
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
});