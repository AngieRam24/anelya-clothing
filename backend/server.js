require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const Producto = require('./models/Producto');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
conectarDB();

// Cargar las 18 prendas iniciales si MongoDB está vacío
const cargarSemillaInicial = async () => {
  try {
    const total = await Producto.countDocuments();
    if (total === 0) {
      await Producto.insertMany([
        { nombre: 'Bermuda Rígida Denim', categoria: 'Inferior', talla: 'M', precio: 45000, disponibilidad: 'Recuperada', descripcion: 'Bermuda en denim clásico restaurada artesanalmente.', imagen: '/img/bermudarigida.png' },
        { nombre: 'Blusa Vinotinto IK', categoria: 'Superior', talla: 'S', precio: 38000, disponibilidad: 'Rediseñada', descripcion: 'Blusa escote cuadrado confeccionada con textiles recuperados.', imagen: '/img/blusaik.png' },
        { nombre: 'Body Crochet Manga Larga', categoria: 'Superior', talla: 'S', precio: 52000, disponibilidad: 'Como nueva', descripcion: 'Body tejido en crochet negro de segunda oportunidad.', imagen: '/img/bodycrochet.png' },
        { nombre: 'Body Escote Rojo IK', categoria: 'Superior', talla: 'M', precio: 40000, disponibilidad: 'Recuperada', descripcion: 'Body cómodo en tono vino con acabados reforzados.', imagen: '/img/bodyik.png' },
        { nombre: 'Body Licrado Azul Profundo', categoria: 'Superior', talla: 'S', precio: 36000, disponibilidad: 'Como nueva', descripcion: 'Prenda básica recuperada de alta elasticidad.', imagen: '/img/bodylicrado.png' },
        { nombre: 'Camiseta Negra Estampada', categoria: 'Superior', talla: 'L', precio: 35000, disponibilidad: 'Upcycling', descripcion: 'Camiseta de algodón intervenida con diseño exclusivo.', imagen: '/img/camisetanegra.png' },
        { nombre: 'Chaleco Bordado Artesanal', categoria: 'Superior', talla: 'M', precio: 58000, disponibilidad: 'Rediseñada', descripcion: 'Chaleco intervenido a mano con bordados y retazos textiles.', imagen: '/img/chalecobordado.png' },
        { nombre: 'Chaleco en Lino Natural', categoria: 'Superior', talla: 'M', precio: 50000, disponibilidad: 'Recuperada', descripcion: 'Chaleco fresco en lino claro restaurado para uso diario.', imagen: '/img/chalecolino.png' },
        { nombre: 'Corset Upcycling Jeans', categoria: 'Superior', talla: 'S', precio: 62000, disponibilidad: 'Upcycling', descripcion: 'Pieza única elaborada a partir de retazos de denim recuperado.', imagen: '/img/corsetjeans.png' },
        { nombre: 'Crop Top Blanco Básico', categoria: 'Superior', talla: 'S', precio: 30000, disponibilidad: 'Como nueva', descripcion: 'Crop top ligero ideal para combinar con prendas de tiro alto.', imagen: '/img/croptop.png' },
        { nombre: 'Enterizo Negro IK', categoria: 'Enterizos', talla: 'M', precio: 68000, disponibilidad: 'Recuperada', descripcion: 'Enterizo corto elegante con ajuste en cintura.', imagen: '/img/enterizoik.png' },
        { nombre: 'Falda Jeans Vintage', categoria: 'Inferior', talla: 'S', precio: 44000, disponibilidad: 'Rediseñada', descripcion: 'Falda corta en denim con lavado clásico y ruedo renovado.', imagen: '/img/faldajeans.png' },
        { nombre: 'Jean Skinny Clásico', categoria: 'Inferior', talla: 'M', precio: 55000, disponibilidad: 'Recuperada', descripcion: 'Jean ajustado en tono azul medio en excelente estado.', imagen: '/img/jeanskinny.png' },
        { nombre: 'Jean Negro Bota Recta', categoria: 'Inferior', talla: 'L', precio: 58000, disponibilidad: 'Como nueva', descripcion: 'Pantalón negro versátil recuperado y listo para estrenar.', imagen: '/img/jeansnegro.png' },
        { nombre: 'Overol Largo Negro', categoria: 'Enterizos', talla: 'M', precio: 72000, disponibilidad: 'Rediseñada', descripcion: 'Overol completo con tirantes ajustables y costuras reforzadas.', imagen: '/img/overol.png' },
        { nombre: 'Set Deportivo Negro', categoria: 'Conjuntos', talla: 'S', precio: 65000, disponibilidad: 'Como nueva', descripcion: 'Conjunto de dos piezas cómodo y renovado.', imagen: '/img/set.png' },
        { nombre: 'Short Bordado Denim', categoria: 'Inferior', talla: 'S', precio: 46000, disponibilidad: 'Upcycling', descripcion: 'Short en jean intervenido con detalles bordados únicos.', imagen: '/img/shortbordado.png' },
        { nombre: 'Short Denim con Brillos', categoria: 'Inferior', talla: 'M', precio: 48000, disponibilidad: 'Rediseñada', descripcion: 'Short azul claro transformado con aplicaciones brillantes.', imagen: '/img/shortbrillos.png' }
      ]);
      console.log('18 prendas iniciales cargadas en MongoDB');
    }
  } catch (error) {
    // Se ejecutará cuando MongoDB esté conectado
  }
};

setTimeout(cargarSemillaInicial, 2000);

// Rutas de la API
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/solicitudes', require('./routes/solicitudRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor Backend de ANELYA CLOTHING corriendo en http://localhost:${PORT}`);
});
