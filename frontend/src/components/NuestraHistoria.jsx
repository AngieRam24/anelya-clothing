import React from 'react';

function NuestraHistoria() {
  return (
    <section id="historia" class="nosotros">
      <div class="nosotros-contenido">
        <div class="nosotros-texto">
          <span class="etiqueta-seccion">Identidad &amp; Propósito</span>
          <h2>Nuestra Historia</h2>
          <p>
            <strong>ANELYA CLOTHING</strong> es un emprendimiento de moda circular dedicado a rescatar, reparar y transformar prendas usadas para darles una segunda oportunidad.
          </p>
          <p>
            Nacemos como respuesta al grave problema ambiental generado por la industria textil y el consumo acelerado del <em>fast fashion</em>, donde millones de prendas en buen estado terminan desechadas prematuramente.
          </p>
          <p>
            <strong>¿Qué significa la moda circular?</strong> Significa mantener las prendas y los materiales en uso el mayor tiempo posible. En nuestro taller recibimos ropa donada, la clasificamos y aplicamos técnicas de <em>upcycling</em> y confección artesanal con retazos recuperados.
          </p>
          <p>
            Reutilizar textiles reduce la contaminación del agua y los desechos sólidos, permitiéndote vestir piezas exclusivas con historia y conciencia ambiental.
          </p>
        </div>

        <div class="nosotros-imagen">
          <img src="img/costurera.jpg" alt="Proceso artesanal en Anelya Clothing" />
        </div>
      </div>
    </section>
  );
}

export default NuestraHistoria;
