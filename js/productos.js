const productos = [
    {
        id: 1,
        nombre: "Martillo de Uña 16oz",
        precio: 12990,
        stock: 25,
        categoria: "Herramientas Manuales",
        imagen: "img/producto1.jpg",
        descripcion: "Martillo de acero forjado con mango ergonómico antideslizante."
    },
    {
        id: 2,
        nombre: "Taladro Percutor 750W",
        precio: 45990,
        stock: 10,
        categoria: "Herramientas Eléctricas",
        imagen: "img/producto2.jpg",
        descripcion: "Taladro percutor de alta potencia con regulador de velocidad."
    },
    {
        id: 3,
        nombre: "Set de Destornilladores 6pcs",
        precio: 8990,
        stock: 15,
        categoria: "Herramientas Manuales",
        imagen: "img/producto3.jpg",
        descripcion: "Set variado de destornilladores de cabeza plana y de cruz."
    },
    {
        id: 4,
        nombre: "Saco de Cemento 25kg",
        precio: 6490,
        stock: 50,
        categoria: "Materiales de Construcción",
        imagen: "img/producto4.jpg",
        descripcion: "Cemento de alta resistencia para todo tipo de obras y construcción."
    }
];

function cargarProductos() {
    const contenedor = document.getElementById("lista-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(prod => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card-producto");
        tarjeta.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" class="img-producto" onerror="this.src='img/producto-ejemplo.jpg'">
            <h3>${prod.nombre}</h3>
            <p class="categoria">Categoría: ${prod.categoria}</p>
            <p class="precio">$${prod.precio.toLocaleString("es-CL")}</p>
            <p class="stock">Stock disponible: ${prod.stock}</p>
            <div class="acciones-card">
                <a href="detalle-producto.html?id=${prod.id}" class="btn-secundario">Ver detalle</a>
                <button type="button" class="btn-agregar" onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', ${prod.precio}, '${prod.imagen}')">
                    Agregar al carrito
                </button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

document.addEventListener("DOMContentLoaded", cargarProductos);