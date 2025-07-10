const express = require('express');
const { body } = require('express-validator');
const { newsController } = require('../controllers');
const { auth, requireRole } = require('../middleware/auth');

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
router.get('/admin', auth, requireRole(['admin', 'editor']), newsController.getAll);
router.get('/:id', auth, requireRole(['admin', 'editor']), newsController.getById);
router.post('/', auth, requireRole(['admin', 'editor']), newsValidation, newsController.create);
router.put('/:id', auth, requireRole(['admin', 'editor']), newsValidation, newsController.update);
router.delete('/:id', auth, requireRole(['admin']), newsController.remove);
router.put('/:id/publish', auth, requireRole(['admin', 'editor']), newsController.publish);
router.put('/order', auth, requireRole(['admin', 'editor']), newsController.updateOrder);

module.exports = router; 