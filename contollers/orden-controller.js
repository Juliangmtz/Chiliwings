const { InformacionOrden, DetalleOrden } = require('../models/011-012');
const OrdenCerrada = require('../models/orden');

exports.cerrarOrden = async (req, res) => {
    try {
        const { idOrden } = req.params;
        const { tipoCierre, fechaCierre } = req.body;

        // Obtener la orden
        const orden = await InformacionOrden.findById(idOrden).lean();
        if (!orden) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        // Obtener los detalles de la orden
        const detalles = await DetalleOrden.find({ idFolioOrden: idOrden }).lean();

        // Crear el documento de orden cerrada con los campos existentes y nuevos
        const ordenCerrada = new OrdenCerrada({
            idFolioOrden: orden._id,
            fecha: orden.fecha,
            idFolioMesero: orden.idFolioMesero,
            numeroMesa: orden.numeroMesa,
            numeroPersonas: orden.numeroPersonas,
            detalles: detalles,
            tipoCierre, // Nuevo campo
            fechaCierre // Nuevo campo
        });

        // Guardar la orden cerrada
        await ordenCerrada.save();

        // Eliminar la orden y los detalles de las colecciones originales
        await InformacionOrden.findByIdAndDelete(idOrden);
        await DetalleOrden.deleteMany({ idFolioOrden: idOrden });

        res.status(200).json({ message: 'Orden cerrada exitosamente' });
    } catch (err) {
        console.error('Error al cerrar la orden:', err);
        res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }
};

