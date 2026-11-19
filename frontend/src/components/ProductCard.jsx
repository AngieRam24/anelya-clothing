import React from 'react';

function ProductCard({ producto, yaEnCarrito, onAgregarCarrito }) {
  const estaVendida = producto.disponibilidad === 'Vendida' || producto.estado === 'Vendida';
  const deshabilitado = yaEnCarrito || estaVendida;

  // Quita la barra inicial '/' si viene así desde MongoDB para que funcione en GitHub Pages
  const rutaImagen = producto.imagen?.startsWith('/')
    ? producto.imagen.slice(1)
    : producto.imagen;

  let textoBoton = 'Añadir al carrito';
  if (estaVendida) {
    textoBoton = 'Prenda Vendida';
  } else if (yaEnCarrito) {
    textoBoton = 'Añadida al carrito ✓';
  }

  return (
    <article class={estaVendida ? 'tarjeta-producto tarjeta-vendida' : 'tarjeta-producto'}>
      <div class="contenedor-img">
        <span class={estaVendida ? 'etiqueta-estado etiqueta-vendida' : 'etiqueta-estado'}>
          {producto.disponibilidad || producto.estado}
        </span>
        <img src={rutaImagen} alt={producto.nombre} />
      </div>

      <div class="info-producto">
        <span class="categoria-tag">
          {producto.categoria} · Talla {producto.talla}
        </span>
        <h3>{producto.nombre}</h3>
        <p class="descripcion-prenda">{producto.descripcion}</p>
        <p class="precio">${Number(producto.precio).toLocaleString('es-CO')} COP</p>

        <button
          class={deshabilitado ? 'btn-solicitar btn-deshabilitado' : 'btn-solicitar'}
          disabled={deshabilitado}
          onClick={() => onAgregarCarrito(producto)}
        >
          {textoBoton}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
