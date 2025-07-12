const express = require('express');
const router = express.Router();
const massIntentionController = require('../controllers/massIntentionController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Todas as rotas requerem autenticação e papel de admin ou editor
router.use(authenticateToken);
router.use(requireRole(['admin', 'editor']));

// Rotas especiais (devem vir antes das rotas com parâmetros)
router.delete('/delete-all-non-recurring', massIntentionController.deleteAllNonRecurring);
router.get('/print/report', massIntentionController.generatePrintReport);

// Rotas CRUD básicas
router.get('/', massIntentionController.getAll);
router.get('/:id', massIntentionController.getById);
router.post('/', massIntentionController.create);
router.put('/:id', massIntentionController.update);
router.delete('/:id', massIntentionController.remove);

module.exports = router; 