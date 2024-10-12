function buscarProducto() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const products = document.getElementsByClassName('product-item');
    
    for (let i = 0; i < products.length; i++) {
        let title = products[i].getAttribute('data-title').toLowerCase();
        if (title.indexOf(filter) > -1) {
            products[i].style.display = "";
        } else {
            products[i].style.display = "none";
        }
    }
}