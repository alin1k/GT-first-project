import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: String
});

const Category = mongoose.model('Category', categorySchema);

export default Category;


// import items from "./products.js";

// const array = [] ;
// items.filter((val)=>{
//     val.category.forEach(cat=>{
//         array.push(cat);
//     })
// });

// export default [...new Set(array)];;