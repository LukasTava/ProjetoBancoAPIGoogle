const express = require('express');
const router = express.Router();
const PontoController = require('../controllers/PontoController');

router.post('/pontos', PontoController.criarPonto);

router.get('/pontos', PontoController.buscarPontos);

router.get('/pontos/:id', PontoController.buscarPontoPorId);

router.put('/pontos/:id', PontoController.atualizarPonto);

router.delete('/pontos/:id', PontoController.excluirPonto);

module.exports = router;