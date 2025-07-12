const express = require('express');
const { body } = require('express-validator');
const { massScheduleController } = require('../controllers');
const { authenticateToken, requirePermission } = require('../middleware/auth');

const router = express.Router();

// Validação para criação/edição de horários de missa
const massScheduleValidation = [
  body('day_of_week')
    .isInt({ min: 0, max: 6 })
    .withMessage('Dia da semana deve ser um número entre 0 (domingo) e 6 (sábado)'),
  body('time')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Horário deve estar no formato HH:MM'),
  body('description')
    .isLength({ min: 3, max: 200 })
    .withMessage('Descrição deve ter entre 3 e 200 caracteres'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('Status ativo deve ser booleano'),
  body('special_notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Observações especiais devem ter no máximo 500 caracteres')
];

// Rotas públicas
router.get('/', massScheduleController.getAll);
router.get('/active', (req, res) => {
  req.query.is_active = 'true';
  massScheduleController.getAll(req, res);
});
router.get('/today', (req, res) => {
  const today = new Date().getDay();
  req.query.day_of_week = today.toString();
  req.query.is_active = 'true';
  massScheduleController.getAll(req, res);
});

// Rotas protegidas (admin/editor)
router.get('/admin', authenticateToken, requirePermission('mass-schedule'), massScheduleController.getAll);
router.get('/:id', authenticateToken, requirePermission('mass-schedule'), massScheduleController.getById);
router.post('/', authenticateToken, requirePermission('mass-schedule'), massScheduleValidation, massScheduleController.create);
router.put('/:id', authenticateToken, requirePermission('mass-schedule'), massScheduleValidation, massScheduleController.update);
router.delete('/:id', authenticateToken, requirePermission('mass-schedule'), massScheduleController.remove);
router.get('/print/report', authenticateToken, requirePermission('mass-schedule'), massScheduleController.generatePrintReport);

module.exports = router; 