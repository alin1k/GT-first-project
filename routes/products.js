import express from 'express';
import { getProducts, postCategory, deleteCategory, getProductsToBeAdded, postProductToCategory, deleteProductFromCategory, addProduct, postProduct } from '../controllers/products.js';

const router = express.Router();

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
    .post(postProduct);

export default router;