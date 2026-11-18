import React, { useState } from 'react';

const PREGUNTAS_FRECUENTES = [
  {
    pregunta: '¿Qué es ANELYA CLOTHING?',
    respuesta: 'ANELYA CLOTHING es un emprendimiento de moda circular dedicado a rescatar, reparar y transformar prendas usadas para darles una segunda oportunidad.'
  },
  {
    pregunta: '¿Cómo funciona la moda circular?',
    respuesta: 'Consiste en mantener las prendas y textiles en uso el mayor tiempo posible mediante la reutilización y el rediseño, evitando que terminen como residuos.'
  },
  {
    pregunta: '¿Dónde puedo donar mi ropa?',
    respuesta: 'Las donaciones se reciben únicamente de forma presencial en nuestro punto físico. Puedes consultar los detalles en la sección "Punto Físico y Donaciones" de esta página.'
  },
  {
    pregunta: '¿Cómo se transforman las prendas?',
    respuesta: 'Clasificamos la ropa recibida; las prendas en buen estado se restauran y las demás se intervienen con técnicas artesanales de upcycling y retazos textiles.'
  },
  {
    pregunta: '¿Cómo puedo adquirir un producto?',
    respuesta: 'Explora nuestro catálogo, añade las prendas que te gusten al carrito o haz clic en "Solicitar Prenda" y completa el formulario. Nos comunicaremos contigo para coordinar la entrega.'
  },
  {
    pregunta: '¿Qué tipo de prendas puedo encontrar?',
    respuesta: 'Contamos con prendas únicas recuperadas y rediseñadas en categorías como Superior, Inferior, Enterizos y Conjuntos, sujetas a disponibilidad en nuestro catálogo.'
  },
  {
    pregunta: '¿Dónde está ubicado el punto físico?',
    respuesta: 'Nuestro punto físico está ubicado en Cl. 67 #53 - 108 (Medellín, barrio Aranjuez) y atendemos de lunes a viernes de 8:00 a.m. a 5:00 p.m.'
  },
  {
    pregunta: '¿Cómo puedo comunicarme con la marca?',
    respuesta: 'Puedes escribirnos directamente a través del formulario en la sección "Contacto" de esta página con tu nombre, correo y consulta.'
  }
];

function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [entrada, setEntrada] = useState('');
  const [mensajes, setMensajes] = useState([
    {
      autor: 'bot',
      texto: '¡Hola! Soy el asistente virtual de ANELYA CLOTHING. Selecciona una pregunta frecuente o escribe tu consulta.'
    }
  ]);

  const responderPregunta = (textoUsuario) => {
    const consulta = textoUsuario.toLowerCase();
    let respuestaBot =
      'Puedo ayudarte con dudas sobre qué es ANELYA CLOTHING, moda circular, donaciones, transformación de prendas, compras, catálogo, punto físico o contacto. ¡Prueba seleccionando una opción!';

    if (consulta.includes('qué es') || consulta.includes('anelya') || consulta.includes('marca')) {
      respuestaBot = PREGUNTAS_FRECUENTES[0].respuesta;
    } else if (consulta.includes('circular')) {
      respuestaBot = PREGUNTAS_FRECUENTES[1].respuesta;
    } else if (consulta.includes('donar') || consulta.includes('donación')) {
      respuestaBot = PREGUNTAS_FRECUENTES[2].respuesta;
    } else if (consulta.includes('transforman') || consulta.includes('upcycling')) {
      respuestaBot = PREGUNTAS_FRECUENTES[3].respuesta;
    } else if (consulta.includes('adquirir') || consulta.includes('comprar') || consulta.includes('solicitar')) {
      respuestaBot = PREGUNTAS_FRECUENTES[4].respuesta;
    } else if (consulta.includes('tipo') || consulta.includes('prendas') || consulta.includes('catálogo')) {
      respuestaBot = PREGUNTAS_FRECUENTES[5].respuesta;
    } else if (consulta.includes('dónde está') || consulta.includes('ubicado') || consulta.includes('punto físico') || consulta.includes('dirección')) {
      respuestaBot = PREGUNTAS_FRECUENTES[6].respuesta;
    } else if (consulta.includes('comunicarme') || consulta.includes('contacto')) {
      respuestaBot = PREGUNTAS_FRECUENTES[7].respuesta;
    }

    setMensajes((prev) => [
      ...prev,
      { autor: 'usuario', texto: textoUsuario },
      { autor: 'bot', texto: respuestaBot }
    ]);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!entrada.trim()) return;
    responderPregunta(entrada);
    setEntrada('');
  };

  return (
    <div class="chatbot-contenedor">
      {abierto && (
        <div class="chatbot-ventana">
          <div class="chatbot-header">
            <div>
              <strong>Asistente ANELYA</strong>
              <span class="chatbot-nota">Versión demostrativa (respuestas programadas)</span>
            </div>
            <button onClick={() => setAbierto(false)}>X</button>
          </div>

          <div class="chatbot-mensajes">
            {mensajes.map((msg, idx) => (
              <div key={idx} class={`msg ${msg.autor === 'bot' ? 'msg-bot' : 'msg-user'}`}>
                {msg.texto}
              </div>
            ))}

            <div class="sugerencias-chat">
              {PREGUNTAS_FRECUENTES.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  class="btn-sugerencia"
                  onClick={() => responderPregunta(item.pregunta)}
                >
                  {item.pregunta}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={manejarEnvio} class="chatbot-form">
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}

      <button class="chatbot-boton" onClick={() => setAbierto(!abierto)}>
        {abierto ? 'Cerrar Asistente' : 'Asistente IA'}
      </button>
    </div>
  );
}

export default Chatbot;
