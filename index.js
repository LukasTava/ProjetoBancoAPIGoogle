const express = require('express');
const conectarBanco = require('./database/db');
const PontoRouter = require('./routes/PontoRouter');
const cors = require('cors');

const app = express();
const PORT = 3000;

conectarBanco();

app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(express.json());

app.use(PontoRouter);

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Pontos!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
