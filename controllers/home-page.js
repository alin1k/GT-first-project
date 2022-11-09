import products from '../models/items.js'
import categories from '../models/categories.js';

export function getLatestProducts(req,res){
    const latestProducts = [products[products.length-3], products[products.length-2], products[products.length-1]]
    res.render('index.ejs', {products: latestProducts, categories});
}