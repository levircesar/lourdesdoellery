const express = require('express');
const { body } = require('express-validator');
const { dizimistaController } = require('../controllers');
const { authenticateToken, requirePermission } = require('../middleware/auth');

const router = express.Router();

// Validação para criação/edição de dizimistas
const dizimistaValidation = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email deve ser válido'),
  body('phone')
    .optional()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Telefone deve conter apenas números, espaços, hífens, parênteses e +'),
  body('address')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Endereço deve ter no máximo 200 caracteres'),
  body('category')
    .optional()
    .isIn(['regular', 'special', 'inactive'])
    .withMessage('Categoria deve ser regular, special ou inactive'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('Status ativo deve ser booleano'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Observações devem ter no máximo 500 caracteres')
];

// Rotas públicas (limitadas)
router.get('/active', (req, res) => {
  req.query.is_active = 'true';
  dizimistaController.getAll(req, res);
});

// Rotas protegidas (admin/editor)
router.get('/', authenticateToken, requirePermission('dizimistas'), dizimistaController.getAll);
router.get('/admin', authenticateToken, requirePermission('dizimistas'), dizimistaController.getAll);
router.get('/:id', authenticateToken, requirePermission('dizimistas'), dizimistaController.getById);
router.post('/', authenticateToken, requirePermission('dizimistas'), dizimistaValidation, dizimistaController.create);
router.put('/:id', authenticateToken, requirePermission('dizimistas'), dizimistaValidation, dizimistaController.update);
router.delete('/:id', authenticateToken, requirePermission('dizimistas'), dizimistaController.remove);

module.exports = router; 