const express = require('express');
const bodyParser = require('body-parser');
const Ponto = require('./models/Ponto'); 
const sequelize = require('./database/db');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

sequelize.sync()
  .then(() => {
    console.log('Tabela criada com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao criar a tabela:', error);
  });

app.post('/pontos', async (req, res) => {
  try {
    const ponto = await Ponto.create(req.body);
    res.status(201).json(ponto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar ponto' });
  }
});

app.get('/pontos', async (req, res) => {
  try {
    const pontos = await Ponto.findAll();
    res.json(pontos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar pontos' });
  }
});

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));