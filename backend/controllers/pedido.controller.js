const Pedido = require('../models/pedido.model');
const Producto = require('../models/producto.model'); //  Importar modelo de productos

exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('usuarioId').populate('productos'); // ✅ Agregamos populate
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getPedidosByUsuario = async (req, res) => {
    try {
        if (!req.session.user || !req.session.user.id) {
            return res.status(401).json({ message: "No autorizado. Inicia sesión." });
        }

        const usuarioId = req.session.user.id;
        console.log("Buscando pedidos del usuario:", usuarioId);


        const pedidos = await Pedido.find({ usuarioId });

        if (!pedidos || pedidos.length === 0) {
            return res.status(404).json({ message: "No hay pedidos para este usuario." });
        }


        const pedidosConDetalles = await Promise.all(pedidos.map(async pedido => {
            const productosDetallados = await Promise.all(pedido.productos.map(async productoId => {
                const producto = await Producto.findById(productoId);
                return producto ? {
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: 1 // Puedes modificar esto para reflejar cantidades reales si las manejas
                } : null;
            }));

            return {
                id: pedido._id,
                total: pedido.total,
                estado: pedido.estado,
                productos: productosDetallados.filter(prod => prod !== null) // Filtrar productos inexistentes
            };
        }));

        res.json(pedidosConDetalles);
    } catch (err) {
        console.error("Error al obtener pedidos:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.createPedido = async (req, res) => {
    try {
        console.log("Datos recibidos en el pedido:", req.body);

        const { usuarioId, productos, total, direccion, telefono, referencia } = req.body;

        if (!usuarioId || !productos || productos.length === 0 || !total || !direccion || !telefono) {
            return res.status(400).json({ message: "Faltan datos obligatorios en el pedido." });
        }

        const nuevoPedido = new Pedido({
            usuarioId,
            productos,
            total,
            estado: 'Pendiente',
            direccion,
            telefono,
            referencia
        });

        await nuevoPedido.save();
        res.status(201).json({ message: "Pedido creado con éxito", pedido: nuevoPedido });

    } catch (err) {
        console.error(" Error al crear el pedido:", err);
        res.status(500).json({ error: "Error interno del servidor", detalles: err.message });
    }
};
exports.actualizarEstadoPedido = async (req, res) => {
    try {
        const { estado } = req.body;
        const pedidoId = req.params.id;

        if (!pedidoId) {
            return res.status(400).json({ error: "ID del pedido no proporcionado" });
        }

        console.log(`Actualizando estado del pedido ${pedidoId} a ${estado}`);

        const pedidoActualizado = await Pedido.findByIdAndUpdate(pedidoId, { estado }, { new: true });

        if (!pedidoActualizado) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        res.json({ message: "Pedido actualizado", pedido: pedidoActualizado });
    } catch (err) {
        console.error(" Error al actualizar el pedido:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

