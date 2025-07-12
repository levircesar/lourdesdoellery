const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 100]
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'editor', 'common'),
    defaultValue: 'common',
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  last_login: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'users',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    }
  }
});

// Método para comparar senhas
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para retornar dados seguros (sem senha)
User.prototype.toSafeObject = function() {
  const user = this.toJSON();
  delete user.password;
  return user;
};

// Método para verificar se o usuário tem permissão
User.prototype.hasPermission = function(permission) {
  const permissions = {
    admin: ['all'],
    editor: ['news', 'announcements', 'mass-schedule', 'parish-info', 'dizimistas', 'birthdays'],
    common: ['birthdays']
  };
  
  return permissions[this.role]?.includes('all') || permissions[this.role]?.includes(permission);
};

// Método para verificar se pode alterar o papel de outro usuário
User.prototype.canChangeRole = function(targetUser, newRole) {
  // Administradores podem alterar qualquer papel, exceto de admin para menor
  if (this.role === 'admin') {
    if (targetUser.role === 'admin' && newRole !== 'admin') {
      return false; // Não pode rebaixar outro admin
    }
    return true;
  }
  return false; // Apenas admins podem alterar papéis
};

module.exports = User; 