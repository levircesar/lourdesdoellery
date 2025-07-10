const express = require('express');
const { body } = require('express-validator');
const { parishInfoController } = require('../controllers');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Validação para criação/edição de informações da paróquia
const parishInfoValidation = [
  body('title')
    .isLength({ min: 3, max: 200 })
    .withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('content')
    .isLength({ min: 1 })
    .withMessage('Conteúdo é obrigatório'),
  body('type')
    .isIn(['contact', 'schedule', 'history', 'mission', 'other'])
    .withMessage('Tipo deve ser contact, schedule, history, mission ou other'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('Status ativo deve ser booleano'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Ordem deve ser um número inteiro positivo')
];

// Rotas públicas
router.get('/', parishInfoController.getAll);
router.get('/active', (req, res) => {
  req.query.is_active = 'true';
  parishInfoController.getAll(req, res);
});
router.get('/type/:type', (req, res) => {
  req.query.type = req.params.type;
  req.query.is_active = 'true';
  parishInfoController.getAll(req, res);
});

// Rotas protegidas (admin/editor)
router.get('/admin', auth, requireRole(['admin', 'editor']), parishInfoController.getAll);
router.get('/:id', auth, requireRole(['admin', 'editor']), parishInfoController.getById);
router.post('/', auth, requireRole(['admin', 'editor']), parishInfoValidation, parishInfoController.create);
router.put('/:id', auth, requireRole(['admin', 'editor']), parishInfoValidation, parishInfoController.update);
router.delete('/:id', auth, requireRole(['admin']), parishInfoController.remove);
router.put('/order', auth, requireRole(['admin', 'editor']), parishInfoController.updateOrder);

module.exports = router; 