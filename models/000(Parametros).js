const mongoose = require('mongoose');
 // Asegúrate de importar el modelo Empleado si están en archivos separados

// Definición del esquema de ValidacionesSistema
const validacionesSistemaSchema = new mongoose.Schema({
    folio: {
        type: String,
        required: true,
        maxlength: 15,
        
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 100
    }
});

// Método para mostrar datos de ValidacionesSistema
validacionesSistemaSchema.methods.showData = function() {
    return {
        folio: this.folio,
        descripcion: this.descripcion
    };
};

// Creación del modelo ValidacionesSistema
const ValidacionesSistema = mongoose.model('ValidacionesSistema', validacionesSistemaSchema);

module.exports = ValidacionesSistema;
