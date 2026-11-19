import React from 'react';

function Hero() {
  return (
    <>
      <section id="inicio" className="hero">
        <div className="hero-contenido">
          <span className="badge-sostenible">Moda Circular · Recuperación &amp; Upcycling</span>
          <h1>Viste con propósito, dale una segunda historia a cada prenda</h1>
          <p>
            En ANELYA CLOTHING rescatamos, reparamos y transformamos prendas en desuso para crear piezas únicas, conscientes y sostenibles.
          </p>
          <div className="hero-botones">
            <a href="#catalogo" className="btn-principal">Explorar Catálogo</a>
            <a href="#punto-fisico" className="btn-secundario">Conocer Proceso de Donación</a>
          </div>
        </div>
      </section>

      <section className="seccion-pasos">
        <h2>¿Cómo funciona ANELYA CLOTHING?</h2>
        <div className="grid-pasos">
          <article className="paso-card">
            <h3>1. Recepción en Punto Físico</h3>
            <p>Trae las prendas que ya no usas a nuestro espacio en Medellín para darles un nuevo ciclo de vida.</p>
          </article>
          <article className="paso-card">
            <h3>2. Clasificación y Upcycling</h3>
            <p>Seleccionamos, reparamos y rediseñamos cada pieza artesanalmente con retazos textiles recuperados.</p>
          </article>
          <article className="paso-card">
            <h3>3. Catálogo Circular</h3>
            <p>Publicamos cada prenda única en nuestra web para que solicites su adquisición de forma consciente.</p>
          </article>
        </div>
        <div className="banner-punto-fisico">
          <p>
            <strong>¡Te invitamos a conocer nuestro Punto Físico!</strong> Visítanos en Cl. 67 #53 - 108 (Aranjuez, Medellín) para entregar tus donaciones textiles y conocer nuestro taller.
          </p>
        </div>
      </section>
    </>
  );
}

export default Hero;
