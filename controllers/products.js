import products from '../models/items.js'
import categories from '../models/categories.js';

export function getProducts(req, res){
    const {cat, id} = req.query;

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
        const [item] = products.filter((val)=>val.id === parseInt(id));
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

export function getProductsToBeAdded(req, res){
    const {cat} = req.query;

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

export function addProduct(req, res){
    res.render("products/add-product.ejs", {title: "Adauga un produs nou", categories});
}

export function postCategory(req, res){
    const {cat} = req.query

    if(cat && !categories.includes(cat)){
        categories.push(cat);
        res.status(200).send("All good!");
    }else{
        res.status(403).send("Category already exists");
    }
}

export function postProduct(req, res){
    let item = req.body;

    item.id = parseInt(item.id);
    item.stock = parseInt(item.stock);
    item.price = parseInt(item.price);
    item.color = item.color.split(',');

    item.category = [];
    item.img = "/images/img" + item.id + ".jpg";

    products.push(item);

    res.status(200).redirect('/products?id=' + item.id);
}

export function postProductToCategory(req, res){
    const {cat, id} = req.query;

    const index = products.findIndex(val=> val.id === parseInt(id));
    products[index].category.push(cat); 

    res.status(200).send("Product added sucessfully");
}

export function deleteCategory(req, res){
    const {cat} = req.query;
    const index = categories.indexOf(cat);
    if (index > -1) {
        categories.splice(index, 1); 
    }

    const indexes = [];

    products.forEach((val,i)=>{
        if(val.category.includes(cat)){
            indexes.push(i);
        }
    });

    indexes.forEach(i=>{
        products[i].category = products[i].category.filter(val=> val !== cat);
    });

    res.status(200).send("deleted succsfully!");
}

export function deleteProductFromCategory(req, res){
    const {cat, id} = req.query;

    products.forEach(val=>{
        if(val.id === parseInt(id)){
            const index = val.category.indexOf(cat);
            if (index > -1) {
                val.category.splice(index, 1); 
            }
        }
    });

    res.status(200).send("Product succesfully deleted!");
}

export function deleteProduct(req, res){
    let item;

    if(req.query.id){
        [item] = products.filter(val=>
            val.id === parseInt(req.query.id)
        )
    }

    const index = products.indexOf(item);
    if(index > -1){
        products.splice(index, 1);
    }

    res.status(200).send("Product deleted!");
}