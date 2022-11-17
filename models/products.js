import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    size: String,
    category: [String],
    color: [String],
    price: Number,
    img: String,
    stock: Number
});

const Product = mongoose.model('Product', productSchema);

export default Product;

// export default [
//     {
//         id: 1,
//         name: "Ursulet cu palarie",
//         description: "Un ursulet cu o palarie roz gata sa fie adoptat de tine",
//         size: "L",
//         category: ["Ursulet"],
//         color: ["Alb", "Roz"],
//         price: 100,
//         img: "/images/img1.jpg",
//         stock: 1,
//     },
//     {
//         id: 2,
//         name: "Ursulet panda",
//         description: "Un ursulet panda ce tine o bucatica de pepene in mana",
//         size: "L",
//         category: ["Ursulet"],
//         color: ["Alb", "Negru"],
//         price: 100,
//         img: "/images/img2.jpg",
//         stock: 1,
//     },
//     {
//         id: 3,
//         name: "Ursulet koala",
//         description: "Un ursulet koala mov cu inimioara la burtica",
//         size: "M",
//         category: ["Ursulet"],
//         color: ["Mov"],
//         price: 80,
//         img: "/images/img3.jpg",
//         stock: 1,
//     },
//     {
//         id: 4,
//         name: "Ursulet koala",
//         description: "Un ursulet koala roz cu inimioara la burtica",
//         size: "M",
//         category: ["Ursulet"],
//         color: ["Roz"],
//         price: 80,
//         img: "/images/img4.jpg",
//         stock: 1,
//     },
//     {
//         id: 5,
//         name: "Vulpita",
//         description: "Vulpita roz cu o capsunica",
//         size: "L",
//         category: ["Vulpita"],
//         color: ["Roz"],
//         price: 100,
//         img: "/images/img5.jpg",
//         stock: 1,
//     },
//     {
//         id: 6,
//         name: "Vulpita",
//         description: "Vulpita portocalie gata sa fie adoptata",
//         size: "L",
//         category: ["Vulpita"],
//         color: ["Portocaliu"],
//         price: 100,
//         img: "/images/img6.jpg",
//         stock: 1,
//     },    
// ]