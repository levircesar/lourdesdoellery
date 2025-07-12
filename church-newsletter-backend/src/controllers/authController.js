const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcryptjs'); // Added bcrypt for password hashing

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos obrigatórios
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    // Buscar usuário
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Verificar se usuário está ativo
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Usuário inativo'
      });
    }

    // Verificar senha
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Atualizar último login
    await user.update({ last_login: new Date() });

    // Gerar token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: user.toSafeObject(),
        token
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user.toSafeObject()
      }
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual e nova senha são obrigatórias'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'A nova senha deve ter pelo menos 6 caracteres'
      });
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await req.user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual incorreta'
      });
    }

    // Atualizar senha
    await req.user.update({ password: newPassword });

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Buscar todos os usuários (apenas admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Excluir senha da resposta
      order: [['created_at', 'DESC']]
    });
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor' 
    });
  }
};

// Buscar usuário por ID (apenas admin)
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] } // Excluir senha da resposta
    });
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuário não encontrado' 
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor' 
    });
  }
};

// Criar usuário (apenas admin)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, is_active } = req.body;
    
    // Verificar se email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email já cadastrado' 
      });
    }
    
    const user = await User.create({
      name,
      email,
      password, // O hook do modelo fará o hash automaticamente
      role: role || 'common',
      is_active: is_active !== undefined ? is_active : true
    });
    
    // Retornar usuário sem senha
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      data: userResponse
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor' 
    });
  }
};

// Atualizar usuário (apenas admin)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, is_active } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuário não encontrado' 
      });
    }
    
    // Verificar se email já existe (exceto para o próprio usuário)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          message: 'Email já cadastrado' 
        });
      }
    }
    
    // Preparar dados para atualização
    const updateData = {
      name: name || user.name,
      email: email || user.email,
      role: role || user.role,
      is_active: is_active !== undefined ? is_active : user.is_active
    };
    
    // Se uma nova senha foi fornecida, adicionar aos dados de atualização
    if (password) {
      updateData.password = password; // O hook do modelo fará o hash automaticamente
    }
    
    await user.update(updateData);
    
    // Retornar usuário sem senha
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.json({
      success: true,
      data: userResponse
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor' 
    });
  }
};

// Deletar usuário (apenas admin)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuário não encontrado' 
      });
    }
    
    // Não permitir que admin delete outro admin
    if (user.role === 'admin' && req.user.id !== id) {
      return res.status(403).json({ 
        success: false,
        message: 'Não é possível deletar outro administrador' 
      });
    }
    
    await user.destroy();
    res.json({ 
      success: true,
      message: 'Usuário deletado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor' 
    });
  }
};

// Alterar senha do próprio usuário
const changeOwnPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuário não encontrado' 
      });
    }
    
    // Verificar senha atual
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Senha atual incorreta' 
      });
    }
    
    // Atualizar senha (o hook do modelo fará o hash automaticamente)
    await user.update({ password: newPassword });
    
    res.json({ 
      success: true,
      message: 'Senha alterada com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor' 
    });
  }
};

// Alterar senha de outro usuário (apenas admin)
const changeUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Usuário não encontrado' 
      });
    }
    
    // Atualizar senha (o hook do modelo fará o hash automaticamente)
    await user.update({ password: newPassword });
    
    res.json({ 
      success: true,
      message: 'Senha alterada com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao alterar senha do usuário:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erro interno do servidor' 
    });
  }
};

module.exports = {
  login,
  getProfile,
  changePassword,
  getAllUsers,
  getUserById, // Added getUserById to exports
  createUser,
  updateUser,
  deleteUser,
  changeOwnPassword, // Added changeOwnPassword to exports
  changeUserPassword // Added changeUserPassword to exports
}; 