const mongoose = require('mongoose');

const conectarBanco = async () => {
  try {
    await mongoose.connect('mongodb+srv://lukas:24iOn1HWqhAg5Ruz@cluster0.d5xci.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão com o MongoDB Atlas estabelecida');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
  }
};

module.exports = conectarBanco;