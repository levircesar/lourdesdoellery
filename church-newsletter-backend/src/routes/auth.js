const express = require('express');
const { body } = require('express-validator');
const { authController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validação para login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Senha é obrigatória')
];

// Validação para alteração de senha
const changePasswordValidation = [
  body('currentPassword')
    .isLength({ min: 1 })
    .withMessage('Senha atual é obrigatória'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Nova senha deve ter pelo menos 6 caracteres')
];

// Rotas públicas
router.post('/login', loginValidation, authController.login);

// Rotas protegidas
router.get('/profile', auth, authController.getProfile);
router.put('/change-password', auth, changePasswordValidation, authController.changePassword);

module.exports = router; 