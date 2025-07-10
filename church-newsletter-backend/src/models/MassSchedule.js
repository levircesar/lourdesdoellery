const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MassSchedule = sequelize.define('MassSchedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  day_of_week: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 6
    }
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'mass_schedules'
});

module.exports = MassSchedule; 