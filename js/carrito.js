let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    
    if (document.getElementById("lista-carrito")) {
        renderizarCarrito();
    }

    const btnVaciar = document.getElementById("btn-vaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            carrito = [];
            guardarCarrito();
            renderizarCarrito();
        });
    }

    const btnComprar = document.getElementById("btn-comprar");
    if (btnComprar) {
        btnComprar.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("El carrito está vacío. ¡Agrega algunos productos primero!");
            } else {
                alert("¡Gracias por tu compra en Ferretería Los Maestros!");
                carrito = [];
                guardarCarrito();
                renderizarCarrito();
            }
        });
    }
});

function agregarAlCarrito(id, nombre, precio, imagen = "img/producto-ejemplo.jpg") {
    const productoExistente = carrito.find(prod => prod.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad++; 
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }
    
    guardarCarrito();
    alert(`¡Se agregó "${nombre}" al carrito!`);
}

function renderizarCarrito() {
    const contenedor = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("precio-total");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        if (totalElemento) totalElemento.textContent = "0";
        return;
    }

    carrito.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
            <div class="info-item-carrito">
                <p><strong>${producto.nombre}</strong></p>
                <p>Precio: $${producto.precio.toLocaleString("es-CL")} | Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${(producto.precio * producto.cantidad).toLocaleString("es-CL")}</p>
            </div>
            <button type="button" class="btn-eliminar-item" onclick="eliminarProducto(${index})">Eliminar un artículo</button>
            <hr>
        `;
        contenedor.appendChild(div);
        
        total += producto.precio * producto.cantidad;
    });

    if (totalElemento) {
        totalElemento.textContent = total.toLocaleString("es-CL");
    }
}

function eliminarProducto(indice) {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
    }
    guardarCarrito();
    renderizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

function actualizarContador() {
    const totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    const contadores = document.querySelectorAll("#contador-carrito");
    
    contadores.forEach(contador => {
        contador.textContent = totalItems;
    });
}

window.agregarAlCarrito = agregarAlCarrito;
window.eliminarProducto = eliminarProducto;