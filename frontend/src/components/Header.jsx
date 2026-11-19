import React from 'react';

function Header({ cantidadCarrito, onAbrirCarrito, onCambiarVista, vistaActual }) {
  return (
    <header className="navbar">
      <div className="logo" onClick={() => onCambiarVista('tienda')} style={{ cursor: 'pointer' }}>
        ANELYA CLOTHING
      </div>

      <nav>
        {vistaActual === 'tienda' ? (
          <>
            <a href="#inicio">Inicio</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#historia">Nuestra Historia</a>
            <a href="#punto-fisico">Punto Físico</a>
            <a href="#contacto">Contacto</a>
          </>
        ) : (
          <button className="btn-link" onClick={() => onCambiarVista('tienda')}>
            Volver a la Tienda
          </button>
        )}

        <button className="btn-carrito" onClick={onAbrirCarrito}>
          Carrito ({cantidadCarrito})
        </button>

        <button className="btn-admin" onClick={() => onCambiarVista('admin')}>
          Admin
        </button>
      </nav>
    </header>
  );
}

export default Header;

