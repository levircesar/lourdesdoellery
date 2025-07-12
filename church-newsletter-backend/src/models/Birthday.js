const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Birthday = sequelize.define('Birthday', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  order_index: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'birthdays'
});

module.exports = Birthday; 