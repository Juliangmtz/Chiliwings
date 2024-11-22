const mongoose = require('mongoose');

// Definición del esquema de Sindicatos
const sindicatoSchema = new mongoose.Schema({
    folio: {
        type: String,
        required: true,
        maxlength: 10
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 15
    }
});

// Método para mostrar datos
sindicatoSchema.methods.showData = function() {
    return {
        folio: this.folio,
        descripcion: this.descripcion
    };
};

// Creación del modelo Sindicatos
const Sindicato = mongoose.model('Sindicato', sindicatoSchema);

module.exports = Sindicato;
