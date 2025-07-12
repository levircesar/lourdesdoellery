const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ParishInfo = sequelize.define('ParishInfo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  section: {
    type: DataTypes.ENUM('history', 'mission', 'vision', 'contact', 'address'),
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 200]
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'parish_info'
});

module.exports = ParishInfo; 