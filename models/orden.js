const mongoose = require('mongoose');

const ordenCerradaSchema = new mongoose.Schema({
    idFolioOrden: { type: mongoose.Schema.Types.ObjectId, ref: 'InformacionOrden', required: true },
    fecha: { type: Date, required: true },
    idFolioMesero: { type: String, ref: 'Empleado', required: true },
    numeroMesa: { type: Number, required: true },
    numeroPersonas: { type: Number, required: true },
    detalles: [{
        producto: { type: String, required: true },
        cantidadProducto: { type: Number, required: true },
        infoExtra: { type: String },
        precio: { type: Number, required: true }
    }],
    tipoCierre: { type: String, required: true },
    fechaCierre: { type: Date, required: true }
});

const OrdenCerrada = mongoose.model('OrdenCerrada', ordenCerradaSchema);

module.exports = OrdenCerrada;
