const parametros = new URLSearchParams(window.location.search);

const codigoProducto = parametros.get("codigo");

const productoSeleccionado = productos.find(function(producto) {
    return producto.codigo === codigoProducto;
});

const detalleProducto =
    document.getElementById("detalle-producto");

if (productoSeleccionado) {

    const nombre = document.createElement("h3");
    nombre.textContent = productoSeleccionado.nombre;

    const codigo = document.createElement("p");
    codigo.textContent =
        "Código: " + productoSeleccionado.codigo;

    const categoria = document.createElement("p");
    categoria.textContent =
        "Categoría: " + productoSeleccionado.categoria;

    const marca = document.createElement("p");
    marca.textContent =
        "Marca: " + productoSeleccionado.marca;

    const precio = document.createElement("p");
    precio.textContent =
        "Precio: $" +
        productoSeleccionado.precio.toLocaleString("es-CL");

    const stock = document.createElement("p");
    stock.textContent =
        "Stock disponible: " + productoSeleccionado.stock;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = "Agregar al carrito";

    detalleProducto.appendChild(nombre);
    detalleProducto.appendChild(codigo);
    detalleProducto.appendChild(categoria);
    detalleProducto.appendChild(marca);
    detalleProducto.appendChild(precio);
    detalleProducto.appendChild(stock);
    detalleProducto.appendChild(boton);

} else {

    const mensaje = document.createElement("p");
    mensaje.textContent = "Producto no encontrado.";

    detalleProducto.appendChild(mensaje);
}