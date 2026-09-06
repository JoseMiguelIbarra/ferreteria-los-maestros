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

function agregarAlCarrito(id, nombre, precio) {
    const productoExistente = carrito.find(prod => prod.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad++; 
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    
    guardarCarrito();
    alert(`¡Se agregó ${nombre} al carrito!`);
}

function renderizarCarrito() {
    const contenedor = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("precio-total");
    
    contenedor.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalElemento.textContent = "0";
        return;
    }

    carrito.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
            <p><strong>${producto.nombre}</strong></p>
            <p>Precio: $${producto.precio} | Cantidad: ${producto.cantidad}</p>
            <button onclick="eliminarProducto(${index})">Eliminar un artículo</button>
            <hr>
        `;
        contenedor.appendChild(div);
        
        total += producto.precio * producto.cantidad;
    });

    totalElemento.textContent = total;
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
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        const totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
        contador.textContent = totalItems;
    }
}