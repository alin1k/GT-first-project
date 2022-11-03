import express from 'express';
import products from '../models/items.js'
const router = express.Router();

router.get('/', (req,res)=>{
    const latestProducts = [products[products.length-1], products[products.length-2], products[products.length-3]]

    res.render('index.ejs', {products: latestProducts});
});

export default router;