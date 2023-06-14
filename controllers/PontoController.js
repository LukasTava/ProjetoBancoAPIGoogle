const Ponto = require('../models/Ponto');

const PontoController = {
  criarPonto: async (req, res) => {
    try {
      const ponto = await Ponto.create(req.body);
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
  }
};

module.exports = PontoController;