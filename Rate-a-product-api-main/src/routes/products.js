const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/IsAdmin');

// Público
router.get('/', productController.list);

// Apenas ADMIN
router.post('/', auth, isAdmin, productController.create);
router.put('/:id', auth, isAdmin, productController.update);
router.delete('/:id', auth, isAdmin, productController.delete);

module.exports = router;