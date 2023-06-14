const mongoose = require('mongoose');

const PontoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

const Ponto = mongoose.model('Ponto', PontoSchema);

module.exports = Ponto;