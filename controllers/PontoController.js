const Ponto = require('../models/Ponto');
const neo4j = require('neo4j-driver');

const PontoController = {
  criarPonto: async (req, res) => {
    try {
      const { titulo, descricao, latitude, longitude } = req.body;
  
      // Cadastro no MongoDB
      const ponto = await Ponto.create({ titulo, descricao, latitude, longitude });
  
      // Cadastro no Neo4j
      const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'wtut24wA'));
      const session = driver.session();
      await session.run('CREATE (:Ponto {titulo: $titulo, descricao: $descricao, latitude: $latitude, longitude: $longitude})', { titulo, descricao, latitude, longitude });
      await session.close();
      await driver.close();
  
      res.status(201).json(ponto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar ponto' });
    }
  },
  
  buscarPontos: async (req, res) => {
    try {
      const pontos = await Ponto.find();
      res.json(pontos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar pontos' });
    }
  },

  buscarPontoPorId: async (req, res) => {
    try {
      const id = req.params.id;
      const ponto = await Ponto.findById(id);
      if (!ponto) {
        return res.status(404).json({ message: 'Ponto não encontrado' });
      }
      res.json(ponto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar ponto' });
    }
  },

  atualizarPonto: async (req, res) => {
    try {
      const id = req.params.id;
      const ponto = await Ponto.findByIdAndUpdate(id, req.body, { new: true });
      if (!ponto) {
        return res.status(404).json({ message: 'Ponto não encontrado' });
      }
      res.json(ponto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar ponto' });
    }
  },

  excluirPonto: async (req, res) => {
    try {
      const id = req.params.id;
      const ponto = await Ponto.findByIdAndDelete(id);
      if (!ponto) {
        return res.status(404).json({ message: 'Ponto não encontrado' });
      }
      res.json({ message: 'Ponto removido com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir ponto' });
    }
  },

  gostarPonto : async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user; 
  
    try {
      const ponto = await Ponto.findById(id);
      if (!ponto) {
        return res.status(404).json({ message: 'Ponto não encontrado' });
      }
  
      const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'wtut24wA'));
      const session = driver.session();
      await session.run('MATCH (u:Usuario), (p:Ponto) WHERE u.id = $userId AND p.id = $pontoId CREATE (u)-[:GOSTA_DE]->(p)', {
        userId,
        pontoId: id,
      });
      await session.close();
      await driver.close();
  
      res.status(200).json({ message: 'Ponto gostado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao gostar do ponto' });
    }
  }
};



module.exports = PontoController;