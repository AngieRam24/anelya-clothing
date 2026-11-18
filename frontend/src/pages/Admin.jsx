import React, { useState, useEffect } from 'react';
import {
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerSolicitudes,
  actualizarEstadoSolicitud
} from '../services/api.js';

function Admin({ token, productos, onRecargarProductos, onCerrarSesion }) {
  const [pestana, setPestana] = useState('productos');
  const [solicitudes, setSolicitudes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formProducto, setFormProducto] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Superior',
    talla: 'M',
    precio: '',
    imagen: '/img/blusaik.png',
    disponibilidad: 'Disponible'
  });

  const cargarSolicitudes = async () => {
    try {
      const data = await obtenerSolicitudes(token);
      if (Array.isArray(data)) setSolicitudes(data);
    } catch (e) {}
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const manejarGuardarProducto = async (e) => {
    e.preventDefault();
    const datos = { ...formProducto, precio: Number(formProducto.precio) };

    if (editandoId) {
      await actualizarProducto(editandoId, datos, token);
      setEditandoId(null);
    } else {
      await crearProducto(datos, token);
    }

    setFormProducto({
      nombre: '',
      descripcion: '',
      categoria: 'Superior',
      talla: 'M',
      precio: '',
      imagen: '/img/blusaik.png',
      disponibilidad: 'Disponible'
    });
    onRecargarProductos();
  };

  const prepararEdicion = (prod) => {
    setEditandoId(prod._id || prod.id);
    setFormProducto({
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      categoria: prod.categoria,
      talla: prod.talla,
      precio: prod.precio,
      imagen: prod.imagen,
      disponibilidad: prod.disponibilidad || prod.estado || 'Disponible'
    });
  };

  const manejarEliminar = async (id) => {
    await eliminarProducto(id, token);
    onRecargarProductos();
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    await actualizarEstadoSolicitud(id, nuevoEstado, token);
    cargarSolicitudes();
  };

  return (
    <section class="panel-admin">
      <div class="admin-header">
        <h2>Panel de Administración · ANELYA CLOTHING</h2>
        <button class="btn-cerrar-sesion" onClick={onCerrarSesion}>Cerrar Sesión</button>
      </div>

      <div class="admin-tabs">
        <button
          class={pestana === 'productos' ? 'tab-activa' : ''}
          onClick={() => setPestana('productos')}
        >
          Gestión de Productos (CRUD)
        </button>
        <button
          class={pestana === 'solicitudes' ? 'tab-activa' : ''}
          onClick={() => setPestana('solicitudes')}
        >
          Gestión de Solicitudes y Mensajes
        </button>
      </div>

      {pestana === 'productos' ? (
        <div class="admin-contenido">
          <form onSubmit={manejarGuardarProducto} class="form-admin">
            <h3>{editandoId ? 'Editar Prenda' : 'Agregar Nueva Prenda'}</h3>
            <input
              type="text"
              placeholder="Nombre de la prenda"
              required
              value={formProducto.nombre}
              onChange={(e) => setFormProducto({ ...formProducto, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción corta"
              required
              value={formProducto.descripcion}
              onChange={(e) => setFormProducto({ ...formProducto, descripcion: e.target.value })}
            />
            <div class="fila-inputs">
              <select
                value={formProducto.categoria}
                onChange={(e) => setFormProducto({ ...formProducto, categoria: e.target.value })}
              >
                <option value="Superior">Superior</option>
                <option value="Inferior">Inferior</option>
                <option value="Enterizos">Enterizos</option>
                <option value="Conjuntos">Conjuntos</option>
              </select>
              <select
                value={formProducto.talla}
                onChange={(e) => setFormProducto({ ...formProducto, talla: e.target.value })}
              >
                <option value="S">Talla S</option>
                <option value="M">Talla M</option>
                <option value="L">Talla L</option>
              </select>
            </div>
            <div class="fila-inputs">
              <input
                type="number"
                placeholder="Precio en COP"
                required
                value={formProducto.precio}
                onChange={(e) => setFormProducto({ ...formProducto, precio: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ruta imagen (ej: /img/blusaik.png)"
                required
                value={formProducto.imagen}
                onChange={(e) => setFormProducto({ ...formProducto, imagen: e.target.value })}
              />
            </div>
            <select
              value={formProducto.disponibilidad}
              onChange={(e) => setFormProducto({ ...formProducto, disponibilidad: e.target.value })}
            >
              <option value="Disponible">Disponible</option>
              <option value="Recuperada">Recuperada</option>
              <option value="Rediseñada">Rediseñada</option>
              <option value="Upcycling">Upcycling</option>
              <option value="Agotada">Agotada</option>
            </select>
            <button type="submit" class="btn-principal">
              {editandoId ? 'Guardar Cambios' : 'Publicar Prenda'}
            </button>
          </form>

          <div class="tabla-admin">
            <h3>Prendas Registradas ({productos.length})</h3>
            {productos.map((prod) => (
              <div key={prod._id || prod.id} class="fila-admin-item">
                <div>
                  <strong>{prod.nombre}</strong> ({prod.categoria} · Talla {prod.talla}) - ${Number(prod.precio).toLocaleString('es-CO')} COP
                </div>
                <div class="acciones-fila">
                  <button class="btn-editar" onClick={() => prepararEdicion(prod)}>Editar</button>
                  <button class="btn-eliminar" onClick={() => manejarEliminar(prod._id || prod.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div class="tabla-admin">
          <h3>Solicitudes y Mensajes Recibidos ({solicitudes.length})</h3>
          {solicitudes.length === 0 ? (
            <p>Aún no hay solicitudes registradas en la base de datos.</p>
          ) : (
            solicitudes.map((sol) => (
              <div key={sol._id} class="tarjeta-solicitud-admin">
                <p><strong>Usuario:</strong> {sol.nombre} ({sol.correo})</p>
                <p><strong>Tipo:</strong> {sol.tipoSolicitud} · <strong>Prenda:</strong> {sol.productoRelacionado}</p>
                <p><strong>Mensaje:</strong> {sol.mensaje}</p>
                <div class="estado-control">
                  <label>Estado: </label>
                  <select
                    value={sol.estado}
                    onChange={(e) => cambiarEstado(sol._id, e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Admin;
