import Cart from "../models/cart.js";
import Category from "../models/categories.js";
import Product from "../models/products.js";



//              GET

export async function getCartItems(req, res){
    const cartItems = await Cart.find();
    const categories = (await Category.distinct('name')).reverse();
    const products = [];
    let totalPrice = 0;

    for(const item of cartItems){
        let addProduct = await Product.findById(item.productId).lean();
        addProduct.quantity = item.quantity;
        totalPrice += addProduct.price * addProduct.quantity;
        addProduct.cartId = item._id;
        products.push(addProduct);
    }

    res.render('cart.ejs', {categories, products, totalPrice});
}

export async function getOrderConfirmation(req, res){
    const categories = (await Category.distinct('name')).reverse();

    res.render('order-confirmation.ejs', {categories});
}



//              POST

export async function postCartItem(req, res){
    const item = req.body;

    try {
        if(await Cart.findOne({productId: item.productId})){
            await Cart.findOneAndUpdate({productId: item.productId}, {$inc: {quantity: 1}});
        }else{
            item.quantity = 1;
            const cartItem = new Cart(item);
            await cartItem.save();
        }

        res.status(200).redirect('/cart');
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function postOrder(req, res){
    console.log("Comanda noua:")
    console.log(req.body);

    try {
        await Cart.deleteMany({});

        res.status(200).redirect("/cart/order");
    } catch (error) {
        res.status(400).json(error.message);
    }

}




//              DELETE

export async function deleteCartItem(req, res){
    const {id} = req.body;

    try {
        await Cart.findByIdAndDelete(id);

        res.status(200).redirect('/cart');
    } catch (error) {
        res.status(400).json(error.message);
    }
}