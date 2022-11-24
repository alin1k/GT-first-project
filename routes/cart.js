import express from 'express';
import {deleteCartItem, getCartItems, postCartItem} from "../controllers/cart.js";
const router = express.Router();

router.route('/')
    .get(getCartItems)
    .post(postCartItem)
    .delete(deleteCartItem);


export default router;