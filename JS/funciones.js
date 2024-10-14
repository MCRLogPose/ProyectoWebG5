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

//esperamos que todos los elementos de la pagina se carguen para continuar con el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    //agregamos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i]; 
        button.addEventListener('click', eliminarItemCarrito);
    }
  

    // agregamos funcionalidad al boton 
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for( var i=0; i< botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Función para manejar el clic en el botón "Agregar al carrito"
var botonesAgregar = document.getElementsByClassName('add-to-cart');
for (var i = 0; i < botonesAgregar.length; i++) {
    botonesAgregar[i].addEventListener('click', function(event) {
        // Obtener los datos del producto
        var producto = event.target.closest('.product-item');
        var titulo = producto.getAttribute('data-title');
        var precio = parseFloat(producto.querySelector('.price').innerText.replace('S/', '').trim());
        var imagenSrc = producto.querySelector('img').src;

        // Agregar el producto al carrito
        agregarItemAlCarrito(titulo, precio, imagenSrc);
    });
}

//agregramos la funcionalidad al boton pagar

document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked);
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

// Actualizamos el total del carrito
function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    // Recorremos cada item en el carrito
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];

        // Obtenemos el precio del item
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('S/', '').trim());

        // Obtenemos la cantidad del item
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;

        // Sumamos el total
        total += precio * cantidad;
    }

    // Actualizamos el total en el DOM
    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'S/ ' + total.toFixed(2);
}

    // Redondeamos el total a dos decimales
    total = Math.round(total * 100) / 100;
 
    // Actualizamos el total en el DOM
    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'S/ ' + total.toFixed(2); // Usamos toFixed para asegurarnos de tener 2 decimales

    // Verificamos en consola el total
    console.log("Total del carrito actualizado:", total);



//aumento en uno la cantidad del elemento seleccionado
// Función para sumar la cantidad
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement; // Obtenemos el contenedor
    var cantidadElemento = selector.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidadActual = parseInt(cantidadElemento.value); // Obtenemos el valor actual de la cantidad
    cantidadActual++; // Incrementamos la cantidad
    cantidadElemento.value = cantidadActual; // Actualizamos el valor en el input

    // Actualizamos el total del carrito
    actualizarTotalCarrito();
}
// Función para restar la cantidad
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement; // Obtenemos el contenedor
    var cantidadElemento = selector.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidadActual = parseInt(cantidadElemento.value); // Obtenemos el valor actual de la cantidad
    if (cantidadActual > 1) {
        cantidadActual--; // Decrementamos la cantidad si es mayor que 1
        cantidadElemento.value = cantidadActual; // Actualizamos el valor en el input
    }

    // Actualizamos el total del carrito
    actualizarTotalCarrito();
}

function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    //la siguiente funcion agrega el elemento al carrito. le mando por parametros los valores
    agregarItemAlCarrito(titulo,precio,imagenSrc);
//hacemos visible el carrito cuando agrega por primera vez 
hacerVisibleCarrito();
}

// Función para agregar el producto al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    // Seleccionar el contenedor del carrito donde se agregará el nuevo item
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Verificar si el item ya está en el carrito
    var nombreItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombreItemsCarrito.length; i++) {
        // Comparar el título y el precio para identificar duplicados
        if (nombreItemsCarrito[i].innerText === titulo) {
            alert("El item ya se encuentra en el carrito");
            return;  // Si el producto ya está en el carrito, no agregarlo
        }
    }

    // Crear un nuevo div para el item
    var item = document.createElement('div');
    item.classList.add('carrito-item');

    // Crear el contenido HTML del item
    var itemContenido = `
        <img src="${imagenSrc}" alt="${titulo}" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">S/${precio.toFixed(2)}</span>
        </div>
        <button class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

    // Asignar el contenido HTML al nuevo div
    item.innerHTML = itemContenido;

    // Agregar el nuevo item al carrito
    itemsCarrito.append(item);

    // Actualizar el total después de agregar el producto
    actualizarTotalCarrito();

    // Agregar la funcionalidad de eliminación al nuevo item
    var btnEliminar = item.getElementsByClassName('btn-eliminar')[0];
    btnEliminar.addEventListener('click', function(event) {
        eliminarItemCarrito(event);
    });

    // Agregar la funcionalidad de sumar y restar cantidad
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    // Hacer visible el carrito cuando agregamos el primer producto
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
    var carrito = document.getElementsByClassName('carrito')[0];  // Correcto, carrito es el contenedor
    carrito.style.right = '0';  // Mostrar el carrito desde la derecha
    carrito.style.opacity = '1'; // Hacerlo visible

    // Ajustar el ancho del contenedor de productos si es necesario
    var productos = document.getElementsByClassName('product-grid')[0];  // Correcto, 'product-grid' es el contenedor de productos
    productos.style.width = '60%';  // Ajuste al 60%, pero puedes cambiarlo según tus necesidades
}
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];  // Contenedor de items dentro del carrito
    if (carritoItems.childElementCount === 0) {
        var carrito = document.getElementsByClassName('carrito')[0];  // Ocultar carrito si no tiene productos
        carrito.style.right = '-100%';  // Mover fuera de la pantalla
        carrito.style.opacity = '0';  // Hacerlo invisible

        // Opcionalmente ajustar el contenedor de productos a su tamaño original
        var productos = document.getElementsByClassName('product-grid')[0];
        productos.style.width = '100%';  // Vuelve a ocupar todo el ancho de la pantalla
    }
}
