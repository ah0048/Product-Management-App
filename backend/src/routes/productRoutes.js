const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/multerMiddleware');
const validate = require('../middlewares/validateMiddleware');
const productSchema = require('../validations/productSchema');
const updateProductSchema = require('../validations/updateProductSchema')

const router = express.Router();


router.post('/', authMiddleware, upload.single('image'), validate(productSchema), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getOneProduct);
router.put('/:id', authMiddleware, upload.single('image'), validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
