const express = require('express');
const { body } = require('express-validator');
const { newsController } = require('../controllers');
const { authenticateToken, requirePermission } = require('../middleware/auth');

const router = express.Router();

// Validação para criação/edição de notícias
const newsValidation = [
  body('title')
    .isLength({ min: 3, max: 200 })
    .withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('content')
    .isLength({ min: 1 })
    .withMessage('Conteúdo é obrigatório'),
  body('excerpt')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Resumo deve ter no máximo 500 caracteres'),
  body('is_published')
    .optional()
    .isBoolean()
    .withMessage('Status de publicação deve ser booleano')
];

// Rotas públicas
router.get('/', newsController.getAll);
router.get('/published', newsController.getAll);
router.get('/slug/:slug', newsController.getBySlug);

// Rotas protegidas (admin/editor)
router.get('/admin', authenticateToken, requirePermission('news'), newsController.getAll);
router.get('/:id', authenticateToken, requirePermission('news'), newsController.getById);
router.post('/', authenticateToken, requirePermission('news'), newsValidation, newsController.create);
router.put('/:id', authenticateToken, requirePermission('news'), newsValidation, newsController.update);
router.delete('/:id', authenticateToken, requirePermission('news'), newsController.remove);
router.put('/:id/publish', authenticateToken, requirePermission('news'), newsController.publish);
router.put('/order', authenticateToken, requirePermission('news'), newsController.updateOrder);

module.exports = router; 