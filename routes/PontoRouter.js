const express = require('express');
const router = express.Router();
const PontoController = require('../controllers/PontoController');
const { autenticar } = require('../controllers/autenticacao');


router.post('/pontos', PontoController.criarPonto);

router.get('/pontos', PontoController.buscarPontos);

router.get('/pontos/:id', PontoController.buscarPontoPorId);

router.put('/pontos/:id', PontoController.atualizarPonto);

router.delete('/pontos/:id', PontoController.excluirPonto);

router.post('/pontos/:id/gostar', autenticar, PontoController.gostarPonto);


module.exports = router;