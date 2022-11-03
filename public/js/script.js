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

    const category = document.getElementById("category-input").value;

    if(category){
        // fetch("http://localhost3000/products", {
        //     method: "POST",
        // })
    }
})