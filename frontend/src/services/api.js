const SERVIDOR = 'https://anelya-clothing-api.onrender.com';
const API_URL = `${SERVIDOR}/api`;

// Obtener productos desde MongoDB
export async function obtenerProductos() {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
}

// Crear nuevo producto (Admin)
export async function crearProducto(producto, token) {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(producto)
  });
  return res.json();
}

// Actualizar producto (Admin)
export async function actualizarProducto(id, producto, token) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(producto)
  });
  return res.json();
}

// Eliminar producto (Admin)
export async function eliminarProducto(id, token) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: token }
  });
  return res.json();
}

// Registrar solicitud de adquisición o mensaje de contacto
export async function enviarSolicitud(solicitud) {
  const res = await fetch(`${API_URL}/solicitudes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(solicitud)
  });
  return res.json();
}

// Consultar solicitudes (Admin)
export async function obtenerSolicitudes(token) {
  const res = await fetch(`${API_URL}/solicitudes`, {
    headers: { Authorization: token }
  });
  return res.json();
}

// Actualizar estado de una solicitud (Admin)
export async function actualizarEstadoSolicitud(id, estado, token) {
  const res = await fetch(`${API_URL}/solicitudes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({ estado })
  });
  return res.json();
}

// Iniciar sesión como administrador
export async function loginAdmin(correo, password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password })
  });
  return res.json();
}
