const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/UsuarioController');

router.post('/usuarios/mongodb', usuariosController.cadastrarUsuarioMongoDB);

router.post('/usuarios/neo4j', usuariosController.cadastrarUsuarioNeo4j);

router.post('/login', usuariosController.login);


module.exports = router;