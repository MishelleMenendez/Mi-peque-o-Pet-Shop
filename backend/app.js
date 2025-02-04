const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

//  Habilitar CORS con credenciales para sesiones
app.use(cors({ 
  origin: 'http://localhost:4200', 
  credentials: true //  Necesario para enviar cookies de sesión
}));

app.use(express.json());

//  Configurar `express-session` correctamente
app.use(session({
  secret: 'clave_secreta_super_segura', 
  resave: false,
  saveUninitialized: false, 
  cookie: { secure: false, httpOnly: true } // Para desarrollo
}));

// Importar rutas
const usuarioRoutes = require('./routes/usuario.routes');
const productoRoutes = require('./routes/producto.routes');
const pedidoRoutes = require('./routes/pedido.routes');

// Usar rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes);

app.get('/', (req, res) => {
  res.send('API de Pet Shop funcionando ');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
