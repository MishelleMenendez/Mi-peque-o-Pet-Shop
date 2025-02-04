const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Contraseña en texto plano
    role: { type: String, enum: ['admin', 'cliente'], default: 'cliente' } // Agregar rol
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
