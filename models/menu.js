const mongoose = require('mongoose');

// Definición del nuevo esquema que solo contiene folio, descripción, categoría del menú y precio
const menuSchema = new mongoose.Schema({
    folio: {
        type: String,
        maxlength: 15
    },
    descripcion: {
        type: String,
        maxlength: 15
    },
    menu: {
        type: String,
        maxlength: 15
    },
    precio: {
        type: String,
        maxlength: 15
    }
});


// Función para crear un nuevo documento en ProductoResumen usando los datos de Producto
menuSchema.methods.createResumen = function() {
    const resumen = new ProductoResumen({
        folio: this.folio,
        descripcion: this.descripcion,
        menu: this.menu,
        precio: this.precio
    });
    return resumen.save();
};


// Creación del modelo ProductoResumen
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
