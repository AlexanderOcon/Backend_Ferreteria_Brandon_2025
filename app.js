//Importar las dependencias necesarias
import express from 'express';
import cors from 'cors';

//Importar las rutas
import rutasCategorias from './scr/routes/categorias.routes.js';
import rutasClientes from './scr/routes/clientes.routes.js';
import rutasCompras from './scr/routes/compras.routes.js';
import rutasDetallesCompra from './scr/routes/detalles_compras.routes.js';
import rutasDetallesVenta from './scr/routes/detalles_venta.routes.js';
import rutasEmpleados from './scr/routes/empleados.rotes.js';
import rutasProductos from './scr/routes/productos.routes.js';
import rutasUsuarios from './scr/routes/usuarios.routes.js';
import rutasVentas from './scr/routes/ventas.routes.js';




// Crear la aplicación de Express
const app = express();

// Habilitar CORS para cualquier origen
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json({ limit: '10mb' })); //10 MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rutas
app.use('/api', rutasCategorias);

app.use('/api', rutasClientes);
app.use('/api', rutasCompras);
app.use('/api', rutasDetallesCompra);
app.use('/api', rutasDetallesVenta);
app.use('/api', rutasEmpleados);
app.use('/api', rutasProductos);
app.use('/api', rutasUsuarios);
app.use('/api', rutasVentas);





// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
  });
});

// Exportar la aplicación
export default app;