const mongoose = require('mongoose');

// Definición del esquema de Empleados
const empleadoSchema = new mongoose.Schema({
    folio: {
        type: String,
        required: true,
        maxlength: 15
    },
    tipo_empleado: {
        type: String,
        required: true,
        enum: ['Gerente', 'Administrativo', 'Cocinero', 'Mesero', 'Para Llevar'],
        maxlength: 15
    },
    empleado: {
        type: String,
        required: true,
        maxlength: 15
    },
    sindicato: {
        type: String,
        required: true,
        maxlength: 15
    },
    ganancia: {
        type: String,
        required: true,
        maxlength: 15
    }
});

// Método para mostrar datos
empleadoSchema.methods.showData = function() {
    return {
        folio: this.folio,
        tipo_empleado: this.tipo_empleado,
        empleado: this.empleado,
        sindicato: this.sindicato,
        ganancia: this.ganancia
    };
};

// Creación del modelo Empleado
const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;
