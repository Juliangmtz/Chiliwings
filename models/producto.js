const mongoose = require('mongoose');

// Definición del esquema de Productos
const productoSchema = new mongoose.Schema({
    folio: {
        type: String,
        maxlength: 15
    },
    descripcion: {
        type: String,
        maxlength: 15
    },
    costo: {
        type: String,
        maxlength: 15
    },
    precio: {
        type: String,
        maxlength: 15
    },
    venta: {
        type: String,
        maxlength: 15
    },
    // Agregar el campo Menu
    menu: {
        type: String,
        required: true, // Es obligatorio
        enum: [
            'B.barra', 
            'Barra extra', 
            'B.fuente', 
            'Ensaladas', 
            'S Del Chef', 
            'Alitas', 
            'M De Niños', 
            'Entradas', 
            'Hamburguesas', 
            'Asador', 
            'otros'
        ], // Las opciones posibles
        // Longitud máxima
        minlength: 1 // Asegura que no esté vacío
    }
});

// Método para mostrar datos
productoSchema.methods.showData = function() {
    return {
        folio: this.folio,
        descripcion: this.descripcion,
        costo: this.costo,
        precio: this.precio,
        venta: this.venta,
        menu: this.menu // Añadido el campo Menu
    };
};

// Hook post-guardar en Producto para copiar datos a Menu
productoSchema.post('save', async function(doc, next) {
    try {
        const Menu = mongoose.model('Menu'); // Asegúrate de que 'Menu' esté registrado en Mongoose

        // Buscar si ya existe un documento en Menu con el mismo folio
        const existingMenu = await Menu.findOne({ folio: doc.folio });

        // Si no existe, entonces crear un nuevo documento
        if (!existingMenu) {
            await Menu.create({
                folio: doc.folio,
                descripcion: doc.descripcion,
                menu: doc.menu,
                precio: doc.precio
            });
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Creación del modelo Producto
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
