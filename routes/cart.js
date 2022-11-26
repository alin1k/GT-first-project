import express from 'express';
import {deleteCartItem, getCartItems, postCartItem, postOrder, getOrderConfirmation} from "../controllers/cart.js";
const router = express.Router();

router.route('/')
    .get(getCartItems)
    .post(postCartItem)
    .delete(deleteCartItem);

router.route('/order')
    .get(getOrderConfirmation)
    .post(postOrder);


export default router;