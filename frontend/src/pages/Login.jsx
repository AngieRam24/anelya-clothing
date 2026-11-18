import React, { useState } from 'react';
import { loginAdmin } from '../services/api.js';

function Login({ onLoginExitoso }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const respuesta = await loginAdmin(correo, password);
      if (respuesta.token) {
        onLoginExitoso(respuesta.token);
      } else {
        setError(respuesta.mensaje || 'Credenciales incorrectas.');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor Backend.');
    }
  };

  return (
    <section class="seccion-login">
      <div class="caja-login">
        <h2>Acceso Administrador</h2>
        <p>Ingresa tus credenciales privadas para gestionar ANELYA CLOTHING.</p>

        {error && <div class="alerta-error">{error}</div>}

        <form onSubmit={manejarSubmit} class="form-solicitud">
          <input
            type="email"
            placeholder="Correo del administrador"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" class="btn-principal">Ingresar al Panel</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
