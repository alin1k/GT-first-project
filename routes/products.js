import express from 'express';
import { getProducts, postCategory, deleteCategory, getProductsToBeAdded, postProductToCategory, deleteProductFromCategory } from '../controllers/products.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(postCategory)
    .delete(deleteCategory);

router.route('/add-product-to-cat')
    .get(getProductsToBeAdded)
    .post(postProductToCategory)
    .delete(deleteProductFromCategory);

export default router;