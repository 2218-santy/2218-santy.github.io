// ================= NAVEGACIÓN ENTRE SECCIONES =================
const buttons = document.querySelectorAll("header nav button");
const sections = document.querySelectorAll("section");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(btn.dataset.section).classList.add("active");
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Botón Ver Productos desde Inicio
document.getElementById("btn-productos").addEventListener("click", () => {
  sections.forEach(sec => sec.classList.remove("active"));
  document.getElementById("productos").classList.add("active");
  buttons.forEach(b => b.classList.remove("active"));
  document.querySelector('button[data-section="productos"]').classList.add("active");
});

// ================= CARRITO =================
const carrito = document.getElementById("carrito");
const btnCarrito = document.getElementById("btn-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const contadorCarrito = document.getElementById("contador-carrito");
const nombreInput = document.getElementById("nombre-cliente");
const linkWhatsapp = document.getElementById("link-whatsapp");

let carritoItems = [];

// Abrir / cerrar carrito
btnCarrito.addEventListener("click", () => carrito.classList.toggle("show"));
cerrarCarrito.addEventListener("click", () => carrito.classList.remove("show"));

// Agregar productos al carrito
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    carritoItems.push({
      producto: btn.dataset.product,
      precio: Number(btn.dataset.price)
    });
    actualizarCarrito();
  });
});

// Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carritoItems = [];
  actualizarCarrito();
  nombreInput.value = "";
});

// ================= FINALIZAR COMPRA POR WHATSAPP =================
linkWhatsapp.addEventListener("click", (e) => {
  e.preventDefault();

  if (carritoItems.length === 0) {
    alert("Tu carrito está vacío 😅");
    return;
  }

  const nombreCliente = nombreInput.value.trim();
  if (!nombreCliente) {
    alert("Por favor ingrese su nombre y apellido.");
    return;
  }

  const telefono = "5493415318922"; // tu número
  let mensaje = `Hola! Soy ${nombreCliente}.\nQuiero hacer este pedido:\n`;

  let totalCompra = 0;
  carritoItems.forEach(item => {
    mensaje += `- ${item.producto} : $${item.precio}\n`;
    totalCompra += item.precio;
  });

  mensaje += `Total: $${totalCompra}`;

  linkWhatsapp.href = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(linkWhatsapp.href, "_blank");
});

// ================= FUNCIONES AUXILIARES =================
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let suma = 0;
  carritoItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.producto} - $${item.precio}`;
    listaCarrito.appendChild(li);
    suma += item.precio;
  });
  total.textContent = `Total: $${suma}`;

  if (carritoItems.length > 0) {
    contadorCarrito.style.display = "inline-block";
    contadorCarrito.textContent = carritoItems.length;
  } else {
    contadorCarrito.style.display = "none";
  }
}
