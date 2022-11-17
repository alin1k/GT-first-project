import express from 'express';
import products from '../models/products.js'
import cartItems from '../models/cart.js';
import categories from '../models/categories.js';
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('cart.ejs', {cartItems, categories});
});

router.post('/', (req, res)=>{
    // const [addedItem] = products.filter(val=>val.id == req.body.id);
    // const cartItem = {
    //     item: addedItem,
    //     quantity: 1,
    // }

    // cartItems.push(cartItem);
    // console.table(cartItems);

    // ************************************  ABANDONEZ MOMENTAN CART FUNCTIONALITY PANA INTEGREZ BAZA DE DATE ******************************************

    res.status(200).send("All good!");
})

export default router;