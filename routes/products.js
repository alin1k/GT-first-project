import express from 'express';
import products from '../models/items.js'
import categories from '../models/categories.js';
const router = express.Router();

router.get('/', (req,res)=>{
    if(req.query.cat){
        const items = products.filter(val=> val.type === req.query.cat);

        if(items.length){
            res.render('products/products.ejs', {products: items, categories});
        }else{
            res.redirect('/products')
        }

    }else{
        res.render('products/products.ejs', {products, categories});
    }

});

router.get('/:id', (req, res)=>{
    const [item] = products.filter((val)=>val.id === parseInt(req.params.id));
    res.render('products/product.ejs', {item, categories});
})

export default router;