const express = require('express');
const { body } = require('express-validator');
const { announcementController } = require('../controllers');
const { authenticateToken, requirePermission } = require('../middleware/auth');

const router = express.Router();

// Validação para criação/edição de anúncios
const announcementValidation = [
  body('title')
    .isLength({ min: 3, max: 200 })
    .withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('content')
    .isLength({ min: 1 })
    .withMessage('Conteúdo é obrigatório'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Prioridade deve ser low, medium ou high'),
  body('is_published')
    .optional()
    .isBoolean()
    .withMessage('Status de publicação deve ser booleano'),
  body('expires_at')
    .optional()
    .isISO8601()
    .withMessage('Data de expiração deve ser uma data válida')
];

// Rotas públicas
router.get('/', announcementController.getAll);
router.get('/published', announcementController.getAll);
router.get('/active', (req, res) => {
  req.query.is_published = 'true';
  // Filtro para anúncios não expirados será aplicado no controller
  announcementController.getAll(req, res);
});

// Rotas protegidas (admin/editor)
router.get('/admin', authenticateToken, requirePermission('announcements'), announcementController.getAll);
router.get('/:id', authenticateToken, requirePermission('announcements'), announcementController.getById);
router.post('/', authenticateToken, requirePermission('announcements'), announcementValidation, announcementController.create);
router.put('/:id', authenticateToken, requirePermission('announcements'), announcementValidation, announcementController.update);
router.delete('/:id', authenticateToken, requirePermission('announcements'), announcementController.remove);
router.put('/order', authenticateToken, requirePermission('announcements'), announcementController.updateOrder);
router.get('/print/report', authenticateToken, requirePermission('announcements'), announcementController.generatePrintReport);

module.exports = router; 