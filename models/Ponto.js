const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const Ponto = sequelize.define('ponto', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  Descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Geometria: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false
  },
}, {
  tableName: 'ponto',
});

module.exports = Ponto;