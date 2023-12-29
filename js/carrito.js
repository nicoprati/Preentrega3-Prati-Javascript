window.addEventListener('load', () => {
  let carrito = cargarCarrito();
  vaciarCarrito();
  cargarProductos(); // Agregar la carga de productos desde el JSON
});

let productos = []; // Declarar la variable productos

// Tomo control sobre las secciones del HTML
let sectionproductos = document.getElementById("section-productos");
let sectionCarrito = document.getElementById("section-carrito");

// Creación de la sección carrito con DOM
let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total: $</h2>";
sectionCarrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("h2");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let cantidadproductos = document.createElement("div");
cantidadproductos.innerHTML = "<h3>Productos: </h3>";
sectionCarrito.appendChild(cantidadproductos);

let cantproductos = document.createElement("h3");
cantproductos.innerText = "0";
cantidadproductos.appendChild(cantproductos);

let botonFinalizar = document.createElement("button");
botonFinalizar.innerText = "Finalizar compra";
sectionCarrito.appendChild(botonFinalizar);
botonFinalizar.setAttribute("class", "boton");

// Le agrego un evento al botón para que muestre el precio final
botonFinalizar.onclick = () => {
  const precioFinal = montoTotalCompra.innerText;
  // Uso sweet alert para que el usuario confirme su compra, cuando toca sí se vacía el carrito
  Swal.fire({
    title: '¿Deseas finalizar tu compra?',
    text: `Total a pagar: $${precioFinal}`,
    showCancelButton: true,
    confirmButtonColor: '#008f39',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Compra confirmada',
        '¡Sus productos están en camino!',
        'success'
      )
      vaciarCarrito();
    }
  })
}

// Renderizado de los productos en cards
const renderizarProductos = (productos) => {
  for (const producto of productos) {
    let container = document.createElement("div");
    container.setAttribute("class", "card-producto");
    container.innerHTML = ` <div class="img-container">
                              <img src="${producto.foto}" alt="${producto.nombre}" class="img-producto"/>
                              </div>
                              <div class="info-producto">
                              <p class="font">${producto.nombre}</p>
                              <strong class="font">$${producto.precio}</strong>
                              <button class="boton" id="btn${producto.id}"> Agregar al carrito </button>
                              </div>`;
    sectionproductos.appendChild(container);
    // Evento para que los productos se agreguen al carrito al hacer clic en el botón
    document.getElementById(`btn${producto.id}`).onclick = () => agregarAlCarrito(`${producto.id}`);
  }
}

// Nueva función para cargar productos desde el JSON
const cargarProductos = () => {
  // Cambiar la ruta del archivo JSON según tu ubicación y nombre de archivo
  fetch('../JSON/productos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      return response.json();
    })
    .then(productosDesdeJSON => {
      // Llamar a una función para renderizar los productos desde el JSON
      renderizarProductos(productosDesdeJSON);
      // Asignar los productos cargados a la variable productos
      productos = productosDesdeJSON;
    })
    .catch(error => {
      console.error('Error al cargar productos desde el JSON:', error);
    });
};

// Funciones
const agregarAlCarrito = (id) => {
  carrito.push(productos.find(p => p.id == id));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularTotalCarrito();
}

const calcularTotalCarrito = () => {
  let total = 0;
  for (const producto of carrito) {
    total += producto.precio;
  }
  montoTotalCompra.innerText = total;
  cantproductos.innerText = carrito.length;
}

const vaciarCarrito = () => {
  montoTotalCompra.innerText = "0";
  cantproductos.innerText = "0";
  localStorage.clear();
  carrito = [];
}

const cargarCarrito = () => {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  return carrito == null ? [] : carrito;
}
