const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');


router.get('/mis-pedidos', pedidoController.getPedidosByUsuario); 
router.patch('/:id', pedidoController.actualizarEstadoPedido);

// Otras rutas existentes
router.get('/', pedidoController.getAllPedidos);
router.post('/', pedidoController.createPedido);

module.exports = router;
