const { InformacionOrden, DetalleOrden } = require('../models/011-012');
const Empleado = require('../models/empleado')

// Obtener todas las órdenes con detalles
// Obtener todas las órdenes con detalles
// Obtener todas las órdenes con detalles
exports.obtenerOrdenes = async (req, res) => {
    try {
        // Buscar todas las órdenes con detalles
        const ordenes = await InformacionOrden.find().lean();  // Eliminar populate, solo traemos las órdenes

        const detalles = await DetalleOrden.find().lean();

        // Asociar detalles a las órdenes
        const resultado = ordenes.map((orden) => {
            const detallesAsociados = detalles.filter(
                (detalle) => detalle.idFolioOrden.toString() === orden._id.toString()
            );
            return { ...orden, detalles: detallesAsociados };
        });

        res.json(resultado);  // Devolver las órdenes con sus detalles
    } catch (err) {
        console.error('Error al obtener las órdenes:', err);
        res.status(500).json({ message: err.message });
    }
};



exports.crearOrden = async (req, res) => {
    try {
        const { fecha, idFolioMesero, numeroMesa, numeroPersonas, productos } = req.body;

        // Validar que el mesero exista y sea del tipo "Mesero"
        const empleado = await Empleado.findOne({ folio: idFolioMesero }); // Buscar por folio, no por ObjectId
        if (!empleado) {
            return res.status(400).json({ message: 'El mesero no existe' });
        }
        if (empleado.tipo_empleado !== 'Mesero') {
            return res.status(400).json({ message: 'El empleado no es un mesero' });
        }

        // Crear la orden principal
        const nuevaOrden = new InformacionOrden({
            fecha: fecha || new Date(),
            idFolioMesero,
            numeroMesa,
            numeroPersonas,
        });

        // Guardar la orden
        const ordenGuardada = await nuevaOrden.save();

        // Crear los detalles de la orden
        const detalles = productos.map(producto => ({
            idFolioOrden: ordenGuardada._id,
            producto: producto.nombre,
            cantidadProducto: producto.cantidad,
            infoExtra: producto.infoExtra || '',
            precio: producto.precio || 0,
        }));

        // Guardar los detalles
        await DetalleOrden.insertMany(detalles);

        res.status(201).json({
            message: 'Orden creada exitosamente',
            orden: ordenGuardada,
            detalles,
        });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Editar una orden por ID de folio
exports.editarOrden = async (req, res) => {
    try {
        const { idFolioOrden, nuevosDatos, nuevosProductos } = req.body;

        const ordenActualizada = await InformacionOrden.findByIdAndUpdate(idFolioOrden, nuevosDatos, { new: true });

        if (nuevosProductos && nuevosProductos.length > 0) {
            await DetalleOrden.deleteMany({ idFolioOrden });
            const nuevosDetalles = nuevosProductos.map(producto => ({
                idFolioOrden,
                producto: producto.nombre,
                cantidadProducto: producto.cantidad,
                infoExtra: producto.infoExtra,
                precio: producto.precio
            }));
            await DetalleOrden.insertMany(nuevosDetalles);
        }

        res.json({ message: 'Orden actualizada exitosamente', orden: ordenActualizada });
    } catch (err) {
        console.error('Error al editar la orden:', err);
        res.status(500).json({ message: err.message });
    }
};

// Eliminar una orden por ID de folio
exports.eliminarOrden = async (req, res) => {
    try {
        const { idFolioOrden } = req.params; // Usamos params para obtener el ID desde la URL

        await DetalleOrden.deleteMany({ idFolioOrden });
        await InformacionOrden.findByIdAndDelete(idFolioOrden);

        res.json({ message: 'Orden eliminada exitosamente' });
    } catch (err) {
        console.error('Error al eliminar la orden:', err);
        res.status(500).json({ message: err.message });
    }
};



exports. mostrarOrdenesPorMesa = async (mesa) => {
    try {
        // Buscar las órdenes por mesa
        const ordenes = await InformacionOrden.find({ numeroMesa: mesa })
            .populate({
                path: '_id', // Relaciona con los detalles
                model: 'DetalleOrden',
                populate: {
                    path: 'producto', // Si producto es una referencia a otra colección
                }
            });

        return ordenes;
    } catch (error) {
        console.error("Error al consultar órdenes:", error);
    }
};


