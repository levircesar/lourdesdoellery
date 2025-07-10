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
  age: {
    type: DataTypes.INTEGER,
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
  tableName: 'birthdays',
  hooks: {
    beforeCreate: (birthday) => {
      if (birthday.birth_date) {
        const today = new Date();
        const birthDate = new Date(birthday.birth_date);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          birthday.age = age - 1;
        } else {
          birthday.age = age;
        }
      }
    },
    beforeUpdate: (birthday) => {
      if (birthday.changed('birth_date')) {
        const today = new Date();
        const birthDate = new Date(birthday.birth_date);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          birthday.age = age - 1;
        } else {
          birthday.age = age;
        }
      }
    }
  }
});

module.exports = Birthday; 