const Usuario = require('../models/Usuario');
const neo4j = require('neo4j-driver');
const jwt = require('jsonwebtoken');

exports.cadastrarUsuarioMongoDB = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }
  
      const usuario = new Usuario({ name, email, password });
      await usuario.save();
  
      res.status(201).json({ message: 'Usuário cadastrado com sucesso no MongoDB!' });
    } catch (error) {
      console.error('Erro ao cadastrar usuário no MongoDB:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o usuário no MongoDB.' });
    }
  };
  
  exports.cadastrarUsuarioNeo4j = async (req, res) => {
    try {
      const { name, email } = req.body;
  
      if (!name || !email) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }
  
      const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'wtut24wA'));
      const session = driver.session();
      await session.run('CREATE (:Usuario {name: $name, email: $email})', { name, email });
      await session.close();
      await driver.close();
  
      res.status(201).json({ message: 'Usuário cadastrado com sucesso no Neo4j!' });
    } catch (error) {
      console.error('Erro ao cadastrar usuário no Neo4j:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o usuário no Neo4j.' });
    }
  };
  
  exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Usuario.findOne({ email, password }).exec();
  
      if (user) {
        const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'wtut24wA'));
        const session = driver.session();
  
        const neo4jUser = await session.run('MATCH (u:Usuario {email: $email}) RETURN u', { email });
        await session.close();
        await driver.close();
  
        if (neo4jUser.records.length > 0) {

          const token = jwt.sign({ userId: user._id }, 'token');
  
          res.status(200).json({ token });
        } else {
          res.status(401).json({ error: 'Credenciais inválidas. Cadastre-se para acessar.' });
        }
      } else {
        res.status(401).json({ error: 'Credenciais inválidas. Cadastre-se para acessar.' });
      }
    } catch (error) {
      console.error('Erro ao verificar o login:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao verificar o login.' });
    }
  };