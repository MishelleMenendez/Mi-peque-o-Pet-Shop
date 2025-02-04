const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        if (password !== usuario.password) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        req.session.user = {
            id: usuario._id.toString(), // Asegurar que sea un string
            role: usuario.role,
            nombre: usuario.nombre
        };

        req.session.save(err => {
            if (err) {
                return res.status(500).json({ error: "Error al guardar la sesión" });
            }

            res.json({ 
                message: "Inicio de sesión exitoso", 
                id: usuario._id, 
                role: usuario.role, 
                nombre: usuario.nombre 
            });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.logout = (req, res) => {
    try {
        req.session.destroy(() => {
            res.json({ message: "Sesión cerrada correctamente" });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserSession = (req, res) => {
    if (req.session && req.session.user) {
        console.log(" Usuario autenticado:", req.session.user);
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: "No hay sesión activa." });
    }
};


exports.register = async (req, res) => {
    try {
        const { nombre, email, password, role } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Crear usuario con contraseña en texto plano
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password, 
            role: role || 'cliente' // Si no se especifica, se asigna "cliente"
        });

        await nuevoUsuario.save();
        res.status(201).json({ message: "Usuario registrado correctamente" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
