import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: String,
    quantity: Number,
})

const Cart = mongoose.model("Cart", cartItemSchema);

export default Cart;