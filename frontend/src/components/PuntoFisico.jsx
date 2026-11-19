import React from 'react';

function PuntoFisico() {
  return (
    <section id="punto-fisico" className="seccion-punto-fisico">
      <div className="contenedor-interno">
        <span className="etiqueta-seccion">Economía Circular Presencial</span>
        <h2>Punto Físico y Donaciones</h2>
        <p className="subtitulo-seccion">
          Las donaciones de prendas se reciben únicamente de manera presencial en nuestro espacio físico.
        </p>

        <div className="grid-punto-fisico">
          <div className="info-ubicacion">
            <h3>Información del Espacio</h3>
            <ul>
              <li>
                <strong>Dirección:</strong> Cl. 67 #53 - 108
              </li>
              <li>
                <strong>Ciudad / Barrio:</strong> Medellín, Aranjuez
              </li>
              <li>
                <strong>Horarios de atención:</strong> Lunes a viernes de 8:00 a.m. - 5:00 p.m.
              </li>
            </ul>

            <h4>¿Cómo entregar tus prendas y condiciones?</h4>
            <p>
              1. <strong>Entrega presencial:</strong> Acércate directamente a nuestro punto físico en los horarios establecidos.
            </p>
            <p>
              2. <strong>Condiciones generales:</strong> Las prendas deben entregarse limpias, secas y sin humedad o deterioro extremo que impida su recuperación textil.
            </p>
            <p>
              3. <strong>Selección y transformación:</strong> Nuestro equipo clasifica cada pieza; las aptas se restauran y las demás se transforman mediante <em>upcycling</em> utilizando sus retazos.
            </p>
          </div>

          <div className="mapa-tarjeta-visual">
            <div className="mapa-pin">📍</div>
            <h3>ANELYA CLOTHING · Punto Físico</h3>
            <p className="mapa-direccion">Cl. 67 #53 - 108 · Barrio Aranjuez, Medellín</p>
            <p className="mapa-coordenadas">Sector Universidad de Antioquia (6.2682° N, 75.5673° O)</p>
            <a
              href="https://www.google.com/maps/place/Universidad+de+Antioquia/@6.268216,-75.5698835,17z/data=!4m14!1m7!3m6!1s0x8e4428e0c9c8772f:0x10cce7ece69b2e2b!2sUniversidad+de+Antioquia!8m2!3d6.268216!4d-75.5673086!16zL20vMDd5bDE5!3m5!1s0x8e4428e0c9c8772f:0x10cce7ece69b2e2b!8m2!3d6.268216!4d-75.5673086!16zL20vMDd5bDE5?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="btn-principal"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PuntoFisico;
