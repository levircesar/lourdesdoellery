const express = require('express');
const { body } = require('express-validator');
const { birthdayController } = require('../controllers');
const { authenticateToken, requirePermission } = require('../middleware/auth');

const router = express.Router();

// Validação para criação/edição de aniversariantes
const birthdayValidation = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('birth_date')
    .custom((value) => {
      // Aceitar tanto formato ISO quanto formato YYYY-MM-DD
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      
      if (!dateRegex.test(value) && !isoRegex.test(value)) {
        throw new Error('Data de nascimento deve estar no formato YYYY-MM-DD');
      }
      
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Data de nascimento deve ser uma data válida');
      }
      
      return true;
    })
    .withMessage('Data de nascimento deve ser uma data válida'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('Status ativo deve ser booleano'),
  body('family_member')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Nome do familiar deve ter no máximo 100 caracteres'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Observações devem ter no máximo 500 caracteres')
];

// Rotas públicas
router.get('/', birthdayController.getAll);
router.get('/active', (req, res) => {
  req.query.is_active = 'true';
  birthdayController.getAll(req, res);
});
router.get('/this-month', (req, res) => {
  const currentMonth = new Date().getMonth() + 1;
  req.query.month = currentMonth.toString();
  req.query.is_active = 'true';
  birthdayController.getAll(req, res);
});
router.get('/next-month', (req, res) => {
  const nextMonth = (new Date().getMonth() + 2) % 12 || 12;
  req.query.month = nextMonth.toString();
  req.query.is_active = 'true';
  birthdayController.getAll(req, res);
});

// Rotas protegidas (admin/editor)
router.get('/admin', authenticateToken, requirePermission('birthdays'), birthdayController.getAll);
router.get('/:id', authenticateToken, requirePermission('birthdays'), birthdayController.getById);
router.post('/', authenticateToken, requirePermission('birthdays'), birthdayValidation, birthdayController.create);
router.put('/:id', authenticateToken, requirePermission('birthdays'), birthdayValidation, birthdayController.update);
router.delete('/:id', authenticateToken, requirePermission('birthdays'), birthdayController.remove);

module.exports = router; 