
window.addEventListener('load', function () {
  carrito = cargarCarrito();
  vaciarCarrito();
});


//tomo control sobre las secciones del HTML
let sectionproductos = document.getElementById("section-productos");
let sectionCarrito = document.getElementById("section-carrito");

//creacion de la seccion carrito con DOM
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


//Le agrego un evento al boton para que muestre el precio final
botonFinalizar.onclick = () => {
  const precioFinal = montoTotalCompra.innerText;
  //uso sweet alert para que el usuario confirme su compra, cuando toca si se vacia el carrito
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
        '¡Sus productos estan en camino!',
        'success'
      )
      vaciarCarrito();
    }
  })
}


//renderizado de los productos en cards
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
  //Evento para que los productos se agreguen al carrito al hacer click en el boton
  document.getElementById(`btn${producto.id}`).onclick = () => agregarAlCarrito(`${producto.id}`);
}



//Funciones
function agregarAlCarrito(id) {
  carrito.push(productos.find(p => p.id == id));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularTotalCarrito();
}

function calcularTotalCarrito() {
  let total = 0;
  for (const producto of carrito) {
    total += producto.precio;
  }
  montoTotalCompra.innerText = total;
  cantproductos.innerText = carrito.length;
}

function vaciarCarrito() {
  montoTotalCompra.innerText = "0";
  cantproductos.innerText = "0";
  localStorage.clear();
  carrito = [];
}


function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito == null) {
    return [];
  } else {
    return carrito;
  }
}


