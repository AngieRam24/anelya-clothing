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
    <article className={estaVendida ? 'tarjeta-producto tarjeta-vendida' : 'tarjeta-producto'}>
      <div className="contenedor-img">
        <span className={estaVendida ? 'etiqueta-estado etiqueta-vendida' : 'etiqueta-estado'}>
          {producto.disponibilidad || producto.estado}
        </span>
        <img src={rutaImagen} alt={producto.nombre} />
      </div>

      <div className="info-producto">
        <span className="categoria-tag">
          {producto.categoria} · Talla {producto.talla}
        </span>
        <h3>{producto.nombre}</h3>
        <p className="descripcion-prenda">{producto.descripcion}</p>
        <p className="precio">${Number(producto.precio).toLocaleString('es-CO')} COP</p>

        <button
          className={deshabilitado ? 'btn-solicitar btn-deshabilitado' : 'btn-solicitar'}
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
