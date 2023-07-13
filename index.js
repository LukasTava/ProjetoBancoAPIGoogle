const express = require('express');
const conectarBanco = require('./database/db');
const PontoRouter = require('./routes/PontoRouter');
const UsuarioRouter = require('./routes/UsuarioRouter');
const cors = require('cors');
const neo4j = require('neo4j-driver');

const app = express();
const PORT = 3000;

conectarBanco();

app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(express.json());
app.use(express.static('public'));
app.use(PontoRouter);
app.use(UsuarioRouter);

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Pontos!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Configuração da conexão com o banco de dados Neo4j
var driver = neo4j.driver(
  'neo4j://localhost:7687',
  neo4j.auth.basic('neo4j','wtut24wA')
);

// Função para executar uma consulta no Neo4j
async function executarConsulta(cypherQuery) {
  const session = driver.session();

  try {
    const result = await session.run(cypherQuery);
    console.log('Consulta executada com sucesso:', result.records);
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
  } finally {
    await session.close();
  }
}

// Exemplo de uso
const consulta = 'MATCH (n) RETURN n LIMIT 5';
executarConsulta(consulta);