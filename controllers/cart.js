import Cart from "../models/cart.js";
import Category from "../models/categories.js";
import Product from "../models/products.js";

export async function getCartItems(req, res){
    const cartItems = await Cart.find();
    const categories = (await Category.distinct('name')).reverse();

    console.log(cartItems);

    res.render('cart.ejs', {categories})
}

export async function postCartItem(req, res){
    const item = req.body;
    item.quantity = 1;

    const cartItem = new Cart(item);
    console.log(cartItem);
    try {
        await cartItem.save();

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