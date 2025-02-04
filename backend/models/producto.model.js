const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    unidades: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Producto || mongoose.model('Producto', productoSchema);
