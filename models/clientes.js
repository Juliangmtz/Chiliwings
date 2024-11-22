const mongoose = require('mongoose');

// Definición del esquema de Clientes
const clienteSchema = new mongoose.Schema({
    folio: {
        type: String,
        maxlength: 15
    },
    cliente: {
        type: String,
        maxlength: 15
    },
    direccion: {
        type: String,
        maxlength: 25
    },
    telefono: {
        type: String,
        maxlength: 15
    }
});

// Método para mostrar datos
clienteSchema.methods.showData = function() {
    return {
        folio: this.folio,
        cliente: this.cliente,
        direccion: this.direccion,
        telefono: this.telefono
    };
};

// Creación del modelo Cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
