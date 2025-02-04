const Producto = require('../models/producto.model');

// Obtener todos los productos
exports.getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json({ message: "Producto añadido correctamente", producto: nuevoProducto });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
