const productos = [
    {
        codigo: "MC001",
        categoria: "Mat. Construcción",
        subcategoria: "Cementos",
        nombre: "Cemento Polpaico gris 25 kg",
        marca: "Polpaico",
        unidad: "Saco",
        precio: 5990,
        stock: 80,
        stockMinimo: 20
    },
    {
        codigo: "MC002",
        categoria: "Mat. Construcción",
        subcategoria: "Cementos",
        nombre: "Cemento Melón blanco 25 kg",
        marca: "Melón",
        unidad: "Saco",
        precio: 7490,
        stock: 40,
        stockMinimo: 10
    },
    {
        codigo: "MC003",
        categoria: "Mat. Construcción",
        subcategoria: "Morteros",
        nombre: "Mortero cola cerámica 25 kg",
        marca: "Volcán",
        unidad: "Saco",
        precio: 5200,
        stock: 50,
        stockMinimo: 15
    },
    {
        codigo: "MC004",
        categoria: "Mat. Construcción",
        subcategoria: "Morteros",
        nombre: "Mortero nivelador piso 25 kg",
        marca: "Weber",
        unidad: "Saco",
        precio: 6490,
        stock: 30,
        stockMinimo: 10
    },
    {
        codigo: "MC005",
        categoria: "Mat. Construcción",
        subcategoria: "Áridos",
        nombre: "Arena fina construcción 25 kg",
        marca: "Granel",
        unidad: "Saco",
        precio: 1800,
        stock: 60,
        stockMinimo: 20
    },
    {
        codigo: "MC006",
        categoria: "Mat. Construcción",
        subcategoria: "Áridos",
        nombre: "Ripio 25 kg",
        marca: "Granel",
        unidad: "Saco",
        precio: 1500,
        stock: 60,
        stockMinimo: 20
    },
    {
        codigo: "MC007",
        categoria: "Mat. Construcción",
        subcategoria: "Ladrillos",
        nombre: "Ladrillo fiscal N°5",
        marca: "Local",
        unidad: "Unidad",
        precio: 380,
        stock: 500,
        stockMinimo: 100
    },
    {
        codigo: "MC008",
        categoria: "Mat. Construcción",
        subcategoria: "Ladrillos",
        nombre: "Ladrillo prensado 6x14x29 cm",
        marca: "Melón",
        unidad: "Unidad",
        precio: 550,
        stock: 300,
        stockMinimo: 80
    },
    {
        codigo: "PT001",
        categoria: "Pinturas",
        subcategoria: "Látex",
        nombre: "Pintura látex interior 1 galón blanco",
        marca: "Sipa",
        unidad: "Galón",
        precio: 9990,
        stock: 40,
        stockMinimo: 10
    },
    {
        codigo: "PT002",
        categoria: "Pinturas",
        subcategoria: "Látex",
        nombre: "Pintura látex interior 4 litros",
        marca: "Sipa",
        unidad: "Envase 4L",
        precio: 12990,
        stock: 30,
        stockMinimo: 8
    }
];

const listaProductos = document.getElementById("lista-productos");

if (listaProductos) {

    productos.forEach(function(producto) {

    const articulo = document.createElement("article");

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const enlace = document.createElement("a");

    enlace.href =
    "detalle-producto.html?codigo=" + producto.codigo;

    enlace.textContent = "Ver detalle";

    const marca = document.createElement("p");
    marca.textContent = "Marca: " + producto.marca;

    const precio = document.createElement("p");
    precio.textContent =
        "Precio: $" + producto.precio.toLocaleString("es-CL");

    const stock = document.createElement("p");
    stock.textContent =
        "Stock disponible: " + producto.stock;

    const boton = document.createElement("button");
    boton.textContent = "Agregar al carrito";
    boton.type = "button";

    articulo.appendChild(nombre);
    articulo.appendChild(marca);
    articulo.appendChild(precio);
    articulo.appendChild(stock);
    articulo.appendChild(boton);
    articulo.appendChild(enlace);

    listaProductos.appendChild(articulo);
});

}
