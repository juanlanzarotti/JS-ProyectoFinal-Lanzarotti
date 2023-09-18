document.addEventListener("DOMContentLoaded", function () {
  const carritoProductos = document.getElementById("carritoProductos");
  const btnAddToCart = document.querySelectorAll(".btn-add-to-cart");
  const carritoLink = document.getElementById("carritoLink");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function agregarAlCarrito(nombre, precio, categoria) {
    const productoExistente = carrito.find(
      (producto) =>
        producto.nombre === nombre && producto.categoria === categoria
    );
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ nombre, precio, categoria, cantidad: 1 });
    }
    actualizarCarrito();
    actualizarDetalleCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function eliminarProducto(nombre, categoria) {
    carrito = carrito.filter(
      (producto) =>
        producto.nombre !== nombre || producto.categoria !== categoria
    );
    actualizarCarrito();
    actualizarDetalleCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function actualizarCarrito() {
    carritoProductos.innerHTML = "";
    let total = 0;

    carrito.forEach((producto) => {
      carritoProductos.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">$${producto.precio.toFixed(2)} - Cantidad: ${producto.cantidad}</p>
            </div>
          </div>
        </div>
      `;
      total += producto.precio * producto.cantidad;
    });

    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.innerHTML = `
    <p>Carrito: ${carrito.length} productos <br> Total: $${total.toFixed(2)} <br> Total con IVA: $${(total * 1.21).toFixed(2)}</p>

    `;
  }

  function actualizarDetalleCarrito() {
    // Código para actualizar la parte del detalle del carrito de compras que arme
  }

  btnAddToCart.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const nombre = card.querySelector(".card-title").innerText;
      const categoria = card.getAttribute("data-categoria");
      const precioTexto = card.querySelector(".product-price").innerText;
      const precio = parseFloat(precioTexto.replace("$", ""));
      agregarAlCarrito(nombre, precio, categoria);
    });
  });

  actualizarCarrito();
  actualizarDetalleCarrito();

  carritoLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../pages/carrito.html";
  });


  carritoProductos.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-remove")) {
      const productoNombre = event.target.getAttribute("data-producto");
      const productoCategoria = event.target.getAttribute("data-categoria");
      eliminarProducto(productoNombre, productoCategoria);
      actualizarCarrito();
      actualizarDetalleCarrito();
    }
  });


  function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
    actualizarDetalleCarrito();
    localStorage.removeItem("carrito");
  }

  const limpiarCarritoIcon = document.getElementById("limpiarCarritoIcon");
  limpiarCarritoIcon.addEventListener("click", () => {
    limpiarCarrito();
  });

  function realizarCompra() {
    if (carrito.length === 0) {
      mostrarMensaje("El carrito está vacío. Debe agregar elementos al carrito antes de realizar una compra.");
      return; // Detiene la función si no hay elementos en el carrito.
    }
  
    // Fórmula para generar un número aleatorio de compra para el cliente (random)
    const numeroDeCompra = Math.floor(Math.random() * 1000000) + 1;
  
    // Lógica para realizar la compra (primero oculto lo que no necesito, despues le doy al usuario el codigo de confirmacion)
    document.querySelector('h1.text-center').style.display = 'none';
    document.getElementById('carritoContainer').style.display = 'none';
    document.getElementById('limpiarCarritoCompleto').style.display = 'none';
    document.getElementById('realizarCompra').style.display = 'none';

    mostrarMensaje(`Compra realizada con éxito\nNúmero de compra: ${numeroDeCompra}\n\nLo esperamos pronto!`);
  
    // Cuando el usuario termina de comprar, lo redirige a index después de 15 segundos
    setTimeout(function () {
      window.location.href = "../index.html";
    }, 8000); // formula de referencia: 500 milisegundos = 0.5 segundos es decir espero 8 segundos para que el usuario sea redirigido

    //limpio el carrito porque el usuario ya compro
    limpiarCarrito();
  }
  

// Función para mostrar mensajes en el DOM
function mostrarMensaje(mensaje) {
  // Crear un elemento de párrafo para el mensaje
  const mensajeElement = document.createElement("p");
  // Usar innerHTML en lugar de textContent para interpretar saltos de línea
  mensajeElement.innerHTML = mensaje.replace(/\n/g, "<br>");

  // Obtener el contenedor de mensajes por su ID
  const mensajeContainer = document.getElementById("mensajeContainer");

  // Verificar si el contenedor existe antes de agregar el mensaje
  if (mensajeContainer) {
    // Agregar el mensaje al contenedor
    mensajeContainer.appendChild(mensajeElement);
  } else {
    console.error("No se encontró el contenedor de mensajes.");
  }
}


  
const realizarCompraButton = document.getElementById("realizarCompra");
  realizarCompraButton.addEventListener("click", () => {
    realizarCompra();
  });

function limpiarCarritoCompleto() {
    
    limpiarCarrito();
  }


  const limpiarCarritoCompletoButton = document.getElementById("limpiarCarritoCompleto");
  limpiarCarritoCompletoButton.addEventListener("click", () => {
    limpiarCarritoCompleto();
  });

});
