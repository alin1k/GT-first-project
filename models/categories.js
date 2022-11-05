import items from "./items.js";

const array = [] ;
items.filter((val)=>{
    val.category.forEach(cat=>{
        array.push(cat);
    })
});

export default [...new Set(array)];;