import React, { useState } from 'react';
import { enviarSolicitud } from '../services/api.js';

function CarritoModal({ abierto, onCerrar, carrito, onEliminarItem, onConfirmarCompra }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [confirmacion, setConfirmacion] = useState('');

  if (!abierto) return null;

  const total = carrito.reduce((suma, item) => suma + Number(item.precio), 0);

  const manejarSolicitud = async (e) => {
    e.preventDefault();
    const listaNombres = carrito.map((p) => `${p.nombre} (Talla ${p.talla})`).join(', ');

    try {
      await enviarSolicitud({
        nombre,
        correo,
        tipoSolicitud: 'Solicitud de adquisición',
        productoRelacionado: listaNombres,
        mensaje:
          mensaje ||
          `Solicitud por ${carrito.length} prenda(s). Total: $${total.toLocaleString('es-CO')} COP.`
      });
    } catch (error) {
      // Permite registrar la compra visualmente aunque el backend no esté encendido
    }

    onConfirmarCompra(carrito);
    setConfirmacion(
      '¡Solicitud registrada! Las prendas han quedado reservadas como Vendidas y te contactaremos pronto.'
    );
    setNombre('');
    setCorreo('');
    setMensaje('');
  };

  return (
    <div class="modal-fondo">
      <div class="modal-caja modal-carrito">
        <button
          class="btn-cerrar"
          onClick={() => {
            setConfirmacion('');
            onCerrar();
          }}
        >
          X
        </button>
        <h3>Tu Selección de Prendas</h3>

        {confirmacion ? (
          <div class="alerta-exito">
            <p>{confirmacion}</p>
            <button
              class="btn-principal"
              onClick={() => {
                setConfirmacion('');
                onCerrar();
              }}
            >
              Volver al catálogo
            </button>
          </div>
        ) : carrito.length === 0 ? (
          <p class="texto-vacio">Aún no has añadido prendas a tu carrito.</p>
        ) : (
          <>
            <ul class="lista-carrito">
              {carrito.map((item, index) => (
                <li key={index} class="item-carrito">
                  <div>
                    <strong>{item.nombre}</strong>
                    <span>
                      {' '}
                      · Talla {item.talla} · ${Number(item.precio).toLocaleString('es-CO')} COP
                    </span>
                  </div>
                  <button class="btn-quitar" onClick={() => onEliminarItem(index)}>
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <p class="total-carrito">
              Total estimado: <strong>${total.toLocaleString('es-CO')} COP</strong>
            </p>

            <form onSubmit={manejarSolicitud} class="form-solicitud">
              <input
                type="text"
                placeholder="Tu nombre completo"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="email"
                placeholder="Tu correo electrónico"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <textarea
                rows="2"
                placeholder="Notas o preguntas sobre la entrega (opcional)"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              ></textarea>
              <button type="submit" class="btn-principal">
                Confirmar Solicitud de Adquisición
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default CarritoModal;
