const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { authenticateToken, authenticateAdminToken } = require('../middleware/auth');
const multer = require('multer');

const upload = multer({dest:'uploads/'});

// Create a new product (Admin only)
router.post('/add', authenticateAdminToken, productController.createProduct);

// Get all products (Allowed for all)
router.get('/get', productController.getAllProducts);

// Get a specific product by ID (Allowed for all)
router.get('/getbyId/:id', productController.getProductById);

// Update a product by ID (Admin only)
router.put('/update/:id', authenticateAdminToken, productController.updateProduct);

// Delete a product by ID (Admin only)
router.delete('/delete/:id', authenticateAdminToken, productController.deleteProduct);

//bulk upload of products
router.post('/bulk',upload.single('file'),authenticateAdminToken, productController.bulkUpload);

module.exports = router;
