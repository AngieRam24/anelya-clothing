import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';

function Catalogo({ productos, carrito = [], onAgregarCarrito }) {
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroTalla, setFiltroTalla] = useState('Todas');

  const productosFiltrados = productos.filter((prenda) => {
    const cumpleCategoria = filtroCategoria === 'Todas' || prenda.categoria === filtroCategoria;
    const cumpleTalla = filtroTalla === 'Todas' || prenda.talla === filtroTalla;
    return cumpleCategoria && cumpleTalla;
  });

  return (
    <section id="catalogo" className="contenedor">
      <span className="etiqueta-seccion">Piezas Únicas</span>
      <h2>Catálogo de Prendas Recuperadas</h2>
      <p className="subtitulo-seccion">
        Cada prenda es una pieza única. Añádela a tu carrito para solicitar su adquisición.
      </p>

      <div className="barra-filtros">
        <div>
          <label>Categoría: </label>
          <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value="Todas">Todas</option>
            <option value="Superior">Superior</option>
            <option value="Inferior">Inferior</option>
            <option value="Enterizos">Enterizos</option>
            <option value="Conjuntos">Conjuntos</option>
          </select>
        </div>

        <div>
          <label>Talla: </label>
          <select value={filtroTalla} onChange={(e) => setFiltroTalla(e.target.value)}>
            <option value="Todas">Todas</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>
      </div>

      <div className="grid-productos">
        {productosFiltrados.map((prenda) => {
          const idPrenda = prenda._id || prenda.id;
          const yaEnCarrito = carrito.some((item) => (item._id || item.id) === idPrenda);

          return (
            <ProductCard
              key={idPrenda}
              producto={prenda}
              yaEnCarrito={yaEnCarrito}
              onAgregarCarrito={onAgregarCarrito}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Catalogo;
