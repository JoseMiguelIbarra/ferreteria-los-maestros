const productosDetalle = [
    {
        id: 1,
        nombre: "Martillo de Uña 16oz",
        precio: 12990,
        stock: 25,
        categoria: "Herramientas Manuales",
        imagen: "img/producto1.jpg",
        descripcion: "Martillo de acero forjado con mango ergonómico antideslizante ideal para trabajos pesados de carpintería y construcción general."
    },
    {
        id: 2,
        nombre: "Taladro Percutor 750W",
        precio: 45990,
        stock: 10,
        categoria: "Herramientas Eléctricas",
        imagen: "img/producto2.jpg",
        descripcion: "Taladro percutor de alta potencia con regulador de velocidad, mango auxiliar de 360 grados y tope de profundidad."
    },
    {
        id: 3,
        nombre: "Set de Destornilladores 6pcs",
        precio: 8990,
        stock: 15,
        categoria: "Herramientas Manuales",
        imagen: "img/producto3.jpg",
        descripcion: "Set de destornilladores aislados de acero al cromo vanadio. Incluye 3 puntas planas y 3 puntas phillips (cruz)."
    },
    {
        id: 4,
        nombre: "Saco de Cemento 25kg",
        precio: 6490,
        stock: 50,
        categoria: "Materiales de Construcción",
        imagen: "img/producto4.jpg",
        descripcion: "Saco de cemento Portland de alto fraguado y resistencia para morteros, hormigones y reparaciones estructurales."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("detalle-producto-container");
    if (!contenedor) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productoId = parseInt(urlParams.get("id")) || 1;

    const producto = productosDetalle.find(p => p.id === productoId) || productosDetalle[0];

    contenedor.innerHTML = `
        <article class="card-detalle">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-detalle" onerror="this.src='img/producto-ejemplo.jpg'">
            <div class="info-detalle">
                <h2>${producto.nombre}</h2>
                <p class="categoria"><strong>Categoría:</strong> ${producto.categoria}</p>
                <p class="precio"><strong>Precio:</strong> $${producto.precio.toLocaleString("es-CL")}</p>
                <p class="stock"><strong>Stock disponible:</strong> ${producto.stock}</p>
                <p class="descripcion">${producto.descripcion}</p>
                
                <div class="control-cantidad">
                    <label for="cantidad-prod">Cantidad:</label>
                    <input type="number" id="cantidad-prod" value="1" min="1" max="${producto.stock}">
                </div>

                <button type="button" id="btn-agregar-detalle" class="btn-primario">
                    Agregar al carrito
                </button>
            </div>
        </article>
    `;

    const btnAgregar = document.getElementById("btn-agregar-detalle");
    if (btnAgregar) {
        btnAgregar.addEventListener("click", () => {
            const inputCantidad = document.getElementById("cantidad-prod");
            const cantidad = parseInt(inputCantidad ? inputCantidad.value : 1) || 1;

            for (let i = 0; i < cantidad; i++) {
                agregarAlCarrito(producto.id, producto.nombre, producto.precio, producto.imagen);
            }
        });
    }
});