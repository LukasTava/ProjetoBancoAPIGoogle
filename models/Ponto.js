const mongoose = require('mongoose');

const PontoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    autoIncrement: true,
    primaryKey: true
  },
  titulo:{
    type:String,
    required:true
  },
  descricao: {
    type: String,
    required: true
  },
  geometria: {
    type: mongoose.Schema.Types.Geometry('Point'),
    required: true
  },
});

const Ponto = mongoose.model('Ponto', PontoSchema);

module.exports = Ponto;