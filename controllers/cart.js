import Cart from "../models/cart.js";
import Category from "../models/categories.js";
import Product from "../models/products.js";

export async function getCartItems(req, res){
    const cartItems = await Cart.find();
    const categories = (await Category.distinct('name')).reverse();
    const products = [];

    for(const item of cartItems){
        console.log(item.productId);
        let addProduct = await Product.findById(item.productId).lean();
        addProduct.quantity = item.quantity;
        console.log(typeof addProduct);
        products.push(addProduct);
    }

    res.render('cart.ejs', {categories, products});
}

export async function postCartItem(req, res){
    const item = req.body;

    try {
        if(await Cart.findOne({productId: item.productId})){
            await Cart.findOneAndUpdate({productId: item.productId}, {$inc: {quantity: 1}});
        }else{
            item.quantity = 1;
            const cartItem = new Cart(item);
            console.log(cartItem);
            await cartItem.save();
        }

        res.status(200).redirect('/cart');
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function deleteCartItem(req, res){
    const {id} = req.body;

    try {
        await Cart.findByIdAndDelete(id);

        res.status(200).redirect('/cart');
    } catch (error) {
        res.status(400).json(error.message);
    }
}