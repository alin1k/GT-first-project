const form = document.querySelector("#add-product");

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    const formData =  Array.from(document.querySelectorAll("#add-product input"));
    formData.push(document.querySelector("#add-product select"), document.querySelector("#add-product textarea"));

    const item = {
        category: [],
    };

    formData.forEach(val => {
        if(val.type === 'number' || val.name === 'id'){
            item[val.name] = parseInt(val.value);
        } else if(val.name === 'color'){
            item[val.name] = val.value.split(",");
        } else{
            item[val.name] = val.value;
        }
    });

    fetch("http://localhost:3000/products/add-product", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    }).then(window.location.href = "/products");
})