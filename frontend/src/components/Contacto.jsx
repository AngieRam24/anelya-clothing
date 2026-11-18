import React, { useState } from 'react';
import { enviarSolicitud } from '../services/api.js';

function Contacto() {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    asunto: 'Consulta general',
    mensaje: ''
  });
  const [confirmacion, setConfirmacion] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevaSolicitud = {
      nombre: datos.nombre,
      correo: datos.correo,
      tipoSolicitud: datos.asunto,
      productoRelacionado: 'Ninguno (Mensaje de contacto)',
      mensaje: datos.mensaje
    };

    await enviarSolicitud(nuevaSolicitud);
    setConfirmacion('¡Tu mensaje ha sido registrado correctamente! Pronto nos comunicaremos contigo.');
    setDatos({ nombre: '', correo: '', asunto: 'Consulta general', mensaje: '' });
  };

  return (
    <section id="contacto" class="seccion-contacto">
      <div class="contenedor-contacto">
        <span class="etiqueta-seccion">Escríbenos</span>
        <h2>Contacto y Consultas</h2>
        <p class="subtitulo-seccion">
          ¿Tienes dudas sobre nuestras prendas recuperadas, tallas o proceso de adquisición? Envíanos tu mensaje.
        </p>

        {confirmacion && <div class="alerta-exito">{confirmacion}</div>}

        <form onSubmit={manejarEnvio} class="form-contacto">
          <input
            type="text"
            placeholder="Tu nombre completo"
            required
            value={datos.nombre}
            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
          />
          <input
            type="email"
            placeholder="Tu correo electrónico"
            required
            value={datos.correo}
            onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
          />
          <select
            value={datos.asunto}
            onChange={(e) => setDatos({ ...datos, asunto: e.target.value })}
          >
            <option value="Consulta general">Consulta sobre la marca</option>
            <option value="Consulta de producto">Consulta sobre una prenda</option>
            <option value="Proceso de adquisición">Información sobre adquisición</option>
            <option value="Información sobre donación">Dudas sobre entrega de donaciones</option>
          </select>
          <textarea
            rows="4"
            placeholder="Escribe aquí tu mensaje..."
            required
            value={datos.mensaje}
            onChange={(e) => setDatos({ ...datos, mensaje: e.target.value })}
          ></textarea>
          <button type="submit" class="btn-principal">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  );
}

export default Contacto;
