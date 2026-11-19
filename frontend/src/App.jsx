import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Catalogo from './components/Catalogo.jsx';
import NuestraHistoria from './components/NuestraHistoria.jsx';
import PuntoFisico from './components/PuntoFisico.jsx';
import Contacto from './components/Contacto.jsx';
import Chatbot from './components/Chatbot.jsx';
import CarritoModal from './components/CarritoModal.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import { obtenerProductos } from './services/api.js';

const PRENDAS_INICIALES = [
  {
    id: 1,
    nombre: 'Bermuda Rígida Denim',
    categoria: 'Inferior',
    talla: 'M',
    precio: 45000,
    estado: 'Recuperada',
    descripcion: 'Bermuda en denim clásico restaurada artesanalmente.',
    imagen: 'img/bermudarigida.png'
  },
  {
    id: 2,
    nombre: 'Blusa Vinotinto IK',
    categoria: 'Superior',
    talla: 'S',
    precio: 38000,
    estado: 'Rediseñada',
    descripcion: 'Blusa escote cuadrado confeccionada con textiles recuperados.',
    imagen: 'img/blusaik.png'
  },
  {
    id: 3,
    nombre: 'Body Crochet Manga Larga',
    categoria: 'Superior',
    talla: 'S',
    precio: 52000,
    estado: 'Como nueva',
    descripcion: 'Body tejido en crochet negro de segunda oportunidad.',
    imagen: 'img/bodycrochet.png'
  },
  {
    id: 4,
    nombre: 'Body Escote Rojo IK',
    categoria: 'Superior',
    talla: 'M',
    precio: 40000,
    estado: 'Recuperada',
    descripcion: 'Body cómodo en tono vino con acabados reforzados.',
    imagen: 'img/bodyik.png'
  },
  {
    id: 5,
    nombre: 'Body Licrado Azul Profundo',
    categoria: 'Superior',
    talla: 'S',
    precio: 36000,
    estado: 'Como nueva',
    descripcion: 'Prenda básica recuperada de alta elasticidad.',
    imagen: 'img/bodylicrado.png'
  },
  {
    id: 6,
    nombre: 'Camiseta Negra Estampada',
    categoria: 'Superior',
    talla: 'L',
    precio: 35000,
    estado: 'Upcycling',
    descripcion: 'Camiseta de algodón intervenida con diseño exclusivo.',
    imagen: 'img/camisetanegra.png'
  },
  {
    id: 7,
    nombre: 'Chaleco Bordado Artesanal',
    categoria: 'Superior',
    talla: 'M',
    precio: 58000,
    estado: 'Rediseñada',
    descripcion: 'Chaleco intervenido a mano con bordados y retazos textiles.',
    imagen: 'img/chalecobordado.png'
  },
  {
    id: 8,
    nombre: 'Chaleco en Lino Natural',
    categoria: 'Superior',
    talla: 'M',
    precio: 50000,
    estado: 'Recuperada',
    descripcion: 'Chaleco fresco en lino claro restaurado para uso diario.',
    imagen: 'img/chalecolino.png'
  },
  {
    id: 9,
    nombre: 'Corset Upcycling Jeans',
    categoria: 'Superior',
    talla: 'S',
    precio: 62000,
    estado: 'Upcycling',
    descripcion: 'Pieza única elaborada a partir de retazos de denim recuperado.',
    imagen: 'img/corsetjeans.png'
  },
  {
    id: 10,
    nombre: 'Crop Top Blanco Básico',
    categoria: 'Superior',
    talla: 'S',
    precio: 30000,
    estado: 'Como nueva',
    descripcion: 'Crop top ligero ideal para combinar con prendas de tiro alto.',
    imagen: 'img/croptop.png'
  },
  {
    id: 11,
    nombre: 'Enterizo Negro IK',
    categoria: 'Enterizos',
    talla: 'M',
    precio: 68000,
    estado: 'Recuperada',
    descripcion: 'Enterizo corto elegante con ajuste en cintura.',
    imagen: 'img/enterizoik.png'
  },
  {
    id: 12,
    nombre: 'Falda Jeans Vintage',
    categoria: 'Inferior',
    talla: 'S',
    precio: 44000,
    estado: 'Rediseñada',
    descripcion: 'Falda corta en denim con lavado clásico y ruedo renovado.',
    imagen: 'img/faldajeans.png'
  },
  {
    id: 13,
    nombre: 'Jean Skinny Clásico',
    categoria: 'Inferior',
    talla: 'M',
    precio: 55000,
    estado: 'Recuperada',
    descripcion: 'Jean ajustado en tono azul medio en excelente estado.',
    imagen: 'img/jeanskinny.png'
  },
  {
    id: 14,
    nombre: 'Jean Negro Bota Recta',
    categoria: 'Inferior',
    talla: 'L',
    precio: 58000,
    estado: 'Como nueva',
    descripcion: 'Pantalón negro versátil recuperado y listo para estrenar.',
    imagen: 'img/jeansnegro.png'
  },
  {
    id: 15,
    nombre: 'Overol Largo Negro',
    categoria: 'Enterizos',
    talla: 'M',
    precio: 72000,
    estado: 'Rediseñada',
    descripcion: 'Overol completo con tirantes ajustables y costuras reforzadas.',
    imagen: 'img/overol.png'
  },
  {
    id: 16,
    nombre: 'Set Deportivo Negro',
    categoria: 'Conjuntos',
    talla: 'S',
    precio: 65000,
    estado: 'Como nueva',
    descripcion: 'Conjunto de dos piezas cómodo y renovado.',
    imagen: 'img/set.png'
  },
  {
    id: 17,
    nombre: 'Short Bordado Denim',
    categoria: 'Inferior',
    talla: 'S',
    precio: 46000,
    estado: 'Upcycling',
    descripcion: 'Short en jean intervenido con detalles bordados únicos.',
    imagen: 'img/shortbordado.png'
  },
  {
    id: 18,
    nombre: 'Short Denim con Brillos',
    categoria: 'Inferior',
    talla: 'M',
    precio: 48000,
    estado: 'Rediseñada',
    descripcion: 'Short azul claro transformado con aplicaciones brillantes.',
    imagen: 'img/shortbrillos.png'
  }
];

function App() {
  const [productos, setProductos] = useState(PRENDAS_INICIALES);
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [vistaActual, setVistaActual] = useState('tienda');
  const [tokenAdmin, setTokenAdmin] = useState(localStorage.getItem('adminToken') || '');
  const [avisoCarrito, setAvisoCarrito] = useState('');

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      if (Array.isArray(data) && data.length > 0) {
        setProductos(data);
      }
    } catch (error) {
      // Mantiene las 18 prendas locales si el backend aún no está encendido
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const agregarAlCarrito = (prenda) => {
    const idPrenda = prenda._id || prenda.id;
    const estaVendida = prenda.disponibilidad === 'Vendida' || prenda.estado === 'Vendida';
    const yaEstaEnCarrito = carrito.some((item) => (item._id || item.id) === idPrenda);

    if (estaVendida || yaEstaEnCarrito) return;

    setCarrito((prev) => [...prev, prenda]);
    setAvisoCarrito(`"${prenda.nombre}" añadida al carrito`);
    setTimeout(() => setAvisoCarrito(''), 2500);
  };

  const eliminarDelCarrito = (indice) => {
    setCarrito((prev) => prev.filter((_, i) => i !== indice));
  };

  const marcarPrendasComoVendidas = (prendasCompradas) => {
    const idsComprados = prendasCompradas.map((item) => item._id || item.id);

    setProductos((prev) =>
      prev.map((prod) => {
        const idProd = prod._id || prod.id;
        if (idsComprados.includes(idProd)) {
          return { ...prod, estado: 'Vendida', disponibilidad: 'Vendida' };
        }
        return prod;
      })
    );

    setCarrito([]);
  };

  const manejarLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setTokenAdmin(token);
  };

  const manejarCerrarSesion = () => {
    localStorage.removeItem('adminToken');
    setTokenAdmin('');
    setVistaActual('tienda');
  };

  return (
    <>
      <Header
        cantidadCarrito={carrito.length}
        onAbrirCarrito={() => setCarritoAbierto(true)}
        onCambiarVista={setVistaActual}
        vistaActual={vistaActual}
      />

      {avisoCarrito && <div className="toast-carrito">{avisoCarrito}</div>}

      {vistaActual === 'tienda' ? (
        <main>
          <Hero />
          <Catalogo
            productos={productos}
            carrito={carrito}
            onAgregarCarrito={agregarAlCarrito}
          />
          <NuestraHistoria />
          <PuntoFisico />
          <Contacto />
        </main>
      ) : tokenAdmin ? (
        <Admin
          token={tokenAdmin}
          productos={productos}
          onRecargarProductos={cargarProductos}
          onCerrarSesion={manejarCerrarSesion}
        />
      ) : (
        <Login onLoginExitoso={manejarLogin} />
      )}

      <CarritoModal
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
        carrito={carrito}
        onEliminarItem={eliminarDelCarrito}
        onConfirmarCompra={marcarPrendasComoVendidas}
      />

      <Chatbot />
      <Footer />
    </>
  );
}

export default App;
