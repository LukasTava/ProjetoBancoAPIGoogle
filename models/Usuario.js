const mongoose = require('mongoose');

const usuarioSquema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const Usuario = mongoose.model('Usuario', usuarioSquema);

module.exports = Usuario;