import express from 'express';
import multer from 'multer';
import path from 'path';
import { getProducts, getCategoryProducts, postCategory, deleteCategory, getProductsToBeAdded, postProductToCategory, deleteProductFromCategory, getAddProductForm, getEditProductForm, postProduct, deleteProduct, updateProduct } from '../controllers/products.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        req.body.date = Date.now();
        cb(null, "img-" + req.body.date + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage });

router.route('/')
    .get(getProducts)
    .post(upload.single('product-image'), postProduct)
    .delete(deleteProduct)
    .patch(upload.none(), updateProduct);

router.route('/add')
    .get(getAddProductForm);

router.route('/edit')
    .get(getEditProductForm);

router.route('/category')
    .get(getCategoryProducts)
    .post(postCategory)
    .delete(deleteCategory);

router.route('/category/add')
    .get(getProductsToBeAdded)
    .post(postProductToCategory)
    .delete(deleteProductFromCategory);

export default router;