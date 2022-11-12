import express from 'express';
import multer from 'multer';
import path from 'path';
import { getProducts, postCategory, deleteCategory, getProductsToBeAdded, postProductToCategory, deleteProductFromCategory, addProduct, postProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, "img" + req.body.id + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage });

router.route('/')
    .get(getProducts)
    .post(postCategory)
    .delete(deleteCategory);

router.route('/add-product-to-cat')
    .get(getProductsToBeAdded)
    .post(postProductToCategory)
    .delete(deleteProductFromCategory);

router.route('/add-product')
    .get(addProduct)
    .post(upload.single('product-image'), postProduct)
    .delete(deleteProduct);

export default router;