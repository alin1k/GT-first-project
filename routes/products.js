import express from 'express';
import products from '../models/items.js'
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('products/products.ejs', {products});
});

router.get('/:id', (req, res)=>{
    const [item] = products.filter((val)=>val.id === parseInt(req.params.id));
    res.render('products/product.ejs', {item});
})

export default router;