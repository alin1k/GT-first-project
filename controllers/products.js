import Product from '../models/products.js'
import Category from '../models/categories.js';
import { unlink } from 'node:fs/promises';

export async function getProducts(req, res){
    const {cat, id} = req.query;

    const products = await Product.find();
    const categories = await Category.distinct('name');

    if(cat){
        const items = products.filter(val=> val.category.includes(cat));

        if(items.length){
            res.render('products/products.ejs', {
                products: items, 
                categories, 
                category: cat ,
                heading: "Toate Produsele din categoria: " + cat
            });
        }else if(categories.includes(cat)){
            res.render('products/products.ejs', {
                products: items, 
                categories, 
                category: cat ,
                heading: "Din pacate aceasta categorie nu contine produse"
            });
        }else{
            res.redirect('/products')
        }

    }else if(id){
        const [item] = products.filter((val)=> val._id.toString() === id);
        if(item){
            res.render('products/product.ejs', {item, categories});
        }else{
            res.redirect('/products');
        }

    }else{
        res.render('products/products.ejs', {
            products, 
            categories, 
            heading: "Toate Produsele!"
        });
    }
}

export async function getProductsToBeAdded(req, res){
    const {cat} = req.query;

    const products = await Product.find();
    const categories = await Category.distinct('name');

    if(categories.includes(cat)){
        const items = products.filter(val=> !val.category.includes(cat));
    
        res.render('products/add-product-to-cat.ejs', {
            products: items, 
            categories, 
            category: cat,
            heading: "Adauga produse in categoria: " + cat, 
            toBeAdded: cat
        });
    }else{
        res.redirect('/products');
    }
}

export async function addProduct(req, res){
    const categories = [];
    const DbCategories = await Category.find();

    DbCategories.forEach(val=>{
        categories.push(val.name);
    })

    res.render("products/add-product.ejs", {title: "Adauga un produs nou", categories});
}

export async function postCategory(req, res){ //REWORK
    const {cat} = req.query

    const newCategory = new Category({name: cat});
    const [catExists] = await Category.find({name: cat});

    try {
        if(cat && !catExists){
            await newCategory.save();
            res.status(200).json(newCategory);
        }else{
            res.status(403).json("category already exists")
        }

    } catch (error) {
        res.status(403).json(error.message);
    }

}

export async function postProduct(req, res){
    let item = req.body;

    item.stock = parseInt(item.stock);
    item.price = parseInt(item.price);
    item.color = item.color.split(',');
    item.category = [];
    item.img = "/images/img-" + item.date + ".jpg";

    const addItem = new Product(item);
    try {
        await addItem.save();

        res.status(200).redirect('/products?id=' + item.id);
    } catch (error) {
        res.status(400).json(error.message);
    }

}

export async function postProductToCategory(req, res){
    const {cat, id} = req.body;

    const itemUpdate = await Product.findById(id);
    itemUpdate.category.push(cat);

    try {
        await Product.findByIdAndUpdate(id, itemUpdate);
    
        res.status(200).redirect('/products?cat=' + cat);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function deleteCategory(req, res){
    const {cat} = req.body;

    try {
        await Category.deleteOne({name: cat});
        const products = await Product.find({category: cat});

        for(let i=0 ; i<products.length ; i++){
            products[i].category = products[i].category.filter(val=> val !== cat);
            await Product.findByIdAndUpdate(products[i]._id, products[i]);
        }

        res.status(200).redirect('/products');        
    } catch (error) {
        res.status(400).json(error.message);
    }

}

export async function deleteProductFromCategory(req, res){
    const {cat, id} = req.body;

    const itemUpdate = await Product.findById(id);
    itemUpdate.category = itemUpdate.category.filter(val=> val !== cat);

    try {
        await Product.findByIdAndUpdate(id, itemUpdate);

        res.status(200).redirect('/products?cat=' + cat);
    } catch (error) {
        res.status(400).json(error.message);
    }


}

export async function deleteProduct(req, res){
    const {id} = req.body;

    try {
        const product = await Product.findById(id);
        await Product.findByIdAndDelete(id);

        try {
            await unlink("public" + product.img);
        } catch (error) {
            console.log(error.message);
        }

        res.status(200).redirect('/products');
    } catch (error) {
        res.status(400).json(error.message);
    }

}