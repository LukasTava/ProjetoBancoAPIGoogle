const mongoose = require('mongoose');
require('dotenv').config();

const conectarBanco = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão com o MongoDB Atlas estabelecida');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
  }
};

module.exports = conectarBanco;