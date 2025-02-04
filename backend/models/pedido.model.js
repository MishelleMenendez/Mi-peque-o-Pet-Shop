const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true }],
    total: { type: Number, required: true },
    estado: { type: String, default: "Pendiente" },
    direccion: { type: String, required: true },  // 
    telefono: { type: String, required: true },   // 
    referencia: { type: String }  // Campo opcional para referencia
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
