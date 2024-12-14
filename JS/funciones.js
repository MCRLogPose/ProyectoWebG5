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
//variable que mantiene el estado visible del carrito
var carritoVisible = false;

//esperamos que todos los elementos de la pagina se carguen 
document.addEventListener('DOMContentLoaded', ready);

function ready() {
    // Funcionalidad para eliminar productos del carrito
    document.querySelectorAll('.btn-eliminar').forEach(button => 
        button.addEventListener('click', eliminarItemCarrito)
    );

    // Funcionalidad para sumar cantidad
    document.querySelectorAll('.sumar-cantidad').forEach(button => 
        button.addEventListener('click', sumarCantidad)
    );

    // Funcionalidad para restar cantidad
    document.querySelectorAll('.restar-cantidad').forEach(button => 
        button.addEventListener('click', restarCantidad)
    );

    // Funcionalidad para agregar productos al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const producto = event.target.closest('.product-item');
            const titulo = producto.getAttribute('data-title');
            const precio = parseFloat(producto.querySelector('.price').innerText.replace('S/', '').trim());
            const imagenSrc = producto.querySelector('img').src;

            agregarItemAlCarrito(titulo, precio, imagenSrc);
        });
    });

    // Funcionalidad para el botón "Pagar"
    document.querySelector('.btn-pagar').addEventListener('click', pagarClicked);
}

//eliminar el item seleccionado del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    // Asegúrate de obtener el div más cercano que contiene la clase 'carrito-item'
    var item = buttonClicked.closest('.carrito-item');
    if (item) {
        item.remove();  // Eliminar el item del carrito
    }
    // Actualizamos el total del carrito
    actualizarTotalCarrito();

    // Ocultamos el carrito si no hay productos
    ocultarCarrito();
}

function actualizarTotalCarrito() {
    const carritoItems = document.querySelectorAll('.carrito-item'); // Seleccionamos todos los items del carrito
    let total = Array.from(carritoItems).reduce((suma, item) => {
        const precio = parseFloat(item.querySelector('.carrito-item-precio').innerText.replace('S/', '').trim());
        const cantidad = parseInt(item.querySelector('.carrito-item-cantidad').value);
        return suma + precio * cantidad; // Sumamos el precio total por cantidad al acumulador  
    }, 0);

    // Actualizamos el total redondeado en el DOM
    const totalRedondeado = total.toFixed(2); 
    document.querySelector('.carrito-precio-total').innerText = `S/ ${totalRedondeado}`;

    // Mostramos el total en la consola (opcional)
    console.log('Total del carrito actualizado:', totalRedondeado);
}

//aumento en uno la cantidad del elemento seleccionado
// Función para sumar la cantidad
function sumarCantidad(event) {
    const cantidadElemento = event.target.parentElement.querySelector('.carrito-item-cantidad');
    cantidadElemento.value = parseInt(cantidadElemento.value) + 1; // Incrementamos y actualizamos directamente
    // Actualizamos el total del carrito
    actualizarTotalCarrito();
}
// Función para restar la cantidad
function restarCantidad(event) {
    const cantidadElemento = event.target.parentElement.querySelector('.carrito-item-cantidad');
    if (parseInt(cantidadElemento.value) > 1) {
        cantidadElemento.value = parseInt(cantidadElemento.value) - 1; // Decrementamos y actualizamos
        actualizarTotalCarrito(); // Actualizamos el total solo si cambia la cantidad
    }
}
function agregarAlCarritoClicked(event) {
    const item = event.target.parentElement;
    const titulo = item.querySelector('.titulo-item').innerText;
    const precio = item.querySelector('.precio-item').innerText;
    const imagenSrc = item.querySelector('.img-item').src;

    console.log(titulo, imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc); // Agregar el producto al carrito
    hacerVisibleCarrito(); // Mostrar el carrito
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const itemsCarrito = document.querySelector('.carrito-items');
    
    // Verificar si el producto ya está en el carrito
    if ([...itemsCarrito.querySelectorAll('.carrito-item-titulo')].some(item => item.innerText.toLowerCase() === titulo.toLowerCase())) {
        alert("El item ya se encuentra en el carrito");
        actualizarTotalCarrito();
        return;
    }

    // Crear el contenido del nuevo producto
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
        <img src="${imagenSrc}" alt="${titulo}" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">S/${parseFloat(precio).toFixed(2)}</span>
        </div>
        <button class="btn-eliminar"><i class="fa-solid fa-trash"></i></button>
    `;

    // Agregar el producto al carrito
    itemsCarrito.append(item);

    // Actualizar total y añadir funcionalidades
    actualizarTotalCarrito();
    item.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);
    item.querySelector('.sumar-cantidad').addEventListener('click', sumarCantidad);
    item.querySelector('.restar-cantidad').addEventListener('click', restarCantidad);

    // Mostrar el carrito
    hacerVisibleCarrito();
}


function pagarClicked(event){
    alert('Gracias por su compra');
    //eliminamos  todos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
//funcion que oculte el carrito
ocultarCarrito();
}
function hacerVisibleCarrito() {
    carritoVisible = true;

    // Mostrar el carrito y ajustar su estilo
    const carrito = document.querySelector('.carrito');
    carrito.style.right = '0';
    carrito.style.opacity = '1';

    // Ajustar el ancho del contenedor de productos
    document.querySelector('.product-grid').style.width = '60%';
}
function ocultarCarrito() {
    const carritoItems = document.querySelector('.carrito-items');
    if (!carritoItems.childElementCount) {
        const carrito = document.querySelector('.carrito');
        carrito.style.right = '-100%';
        carrito.style.opacity = '0';

        // Opcionalmente, ajustar el contenedor de productos a su tamaño original
        document.querySelector('.product-grid').style.width = '100%';
    }
}
