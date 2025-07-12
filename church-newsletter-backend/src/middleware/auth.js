const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso não fornecido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado ou inativo'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

// Middleware para verificar permissões específicas
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      });
    }

    if (!req.user.hasPermission(permission)) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Permissão insuficiente.'
      });
    }

    next();
  };
};

// Middleware para verificar se é administrador
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Usuário não autenticado'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado. Apenas administradores podem acessar este recurso.'
    });
  }

  next();
};

// Middleware para verificar role específico
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      });
    }

    // Se roles for um array, verifica se o usuário tem um dos roles
    if (Array.isArray(roles)) {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Acesso negado. Apenas usuários com role '${roles.join(',')}' podem acessar este recurso.`
        });
      }
    } else {
      // Se roles for uma string, verifica se o usuário tem o role específico
      if (req.user.role !== roles) {
        return res.status(403).json({
          success: false,
          message: `Acesso negado. Apenas usuários com role '${roles}' podem acessar este recurso.`
        });
      }
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  requirePermission,
  requireAdmin,
  requireRole
}; 