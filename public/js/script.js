document.getElementById("add-category").addEventListener("click", (event)=>{
    event.stopPropagation();

    document.getElementById("add-category").classList.remove("d-block");
    document.getElementById("add-category").classList.add("d-none");
    document.getElementById("add-category-form").classList.remove("d-none");
    document.getElementById("add-category-form").classList.add("d-block");
});

document.getElementById("cancel-button").addEventListener("click", (event)=>{
    event.stopPropagation();

    document.getElementById("add-category-form").classList.remove("d-block");
    document.getElementById("add-category-form").classList.add("d-none");
    document.getElementById("add-category").classList.remove("d-none");
    document.getElementById("add-category").classList.add("d-block");
})

document.getElementById("submit-button").addEventListener("click", (event)=>{
    event.stopPropagation();

    let category = document.getElementById("category-input").value;

    category = category.replace(/\s+/g, '');

    if(category){
        fetch("http://localhost:3000/products/category?cat="+category, {method: "POST"}).then(()=>{window.location.href = "/products/category?cat=" + category;})
    }
})