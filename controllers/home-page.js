import Product from '../models/products.js'
import Category from '../models/categories.js';

export async function getLatestProducts(req,res){
    const categories = (await Category.distinct('name')).reverse();
    const products = await Product.find();

    let latestProducts;
    if(products.length > 3){
        latestProducts = [products[products.length-3], products[products.length-2], products[products.length-1]]
    }else{
        latestProducts = products;
    }
    res.render('index.ejs', {products: latestProducts, categories});
}