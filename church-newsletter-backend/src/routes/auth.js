const express = require('express');
const router = express.Router();
const { 
  login, 
  changePassword, 
  getAllUsers, 
  getUserById,
  createUser, 
  updateUser, 
  deleteUser,
  changeOwnPassword,
  changeUserPassword
} = require('../controllers/authController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Rotas públicas
router.post('/login', login);
// router.post('/register', register); // Removido pois não existe

// Rotas protegidas
router.post('/change-password', authenticateToken, changePassword);
router.post('/change-own-password', authenticateToken, changeOwnPassword);

// Rotas de gerenciamento de usuários (apenas admin)
router.get('/users', authenticateToken, requireRole('admin'), getAllUsers);
router.get('/users/:id', authenticateToken, requireRole('admin'), getUserById);
router.post('/users', authenticateToken, requireRole('admin'), createUser);
router.put('/users/:id', authenticateToken, requireRole('admin'), updateUser);
router.delete('/users/:id', authenticateToken, requireRole('admin'), deleteUser);
router.post('/users/:id/change-password', authenticateToken, requireRole('admin'), changeUserPassword);

module.exports = router; 