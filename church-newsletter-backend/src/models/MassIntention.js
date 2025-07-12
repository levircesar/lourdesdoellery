const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MassIntention = sequelize.define('MassIntention', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  intention_type: {
    type: DataTypes.ENUM('thanksgiving', 'deceased'),
    allowNull: false,
    defaultValue: 'thanksgiving'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  is_recurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'mass_intentions',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = MassIntention; 