const mongoose = require('mongoose');
const Producto = require('../models/producto');
const Menu = require('../models/menu');

// Mostrar todos los productos
exports.getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos.map(prod => prod.showData()));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
    const producto = new Producto({
        folio: req.body.folio,
        descripcion: req.body.descripcion,
        costo: req.body.costo,
        precio: req.body.precio,
        venta: req.body.venta,
        menu: req.body.menu // Añadido el campo Menu
    });

    try {
        const newProducto = await producto.save();
        res.status(201).json(newProducto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProductoByFolio = async (req, res) => {
    try {
        const producto = await Producto.findOne({ folio: req.body.folio });
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

        // Eliminar el producto del modelo Producto
        await Producto.deleteOne({ folio: req.body.folio });

        // Eliminar el documento correspondiente del modelo Menu
        const Menu = mongoose.model('Menu');
        await Menu.deleteOne({ folio: req.body.folio });

        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar un producto por folio
exports.updateProductoByFolio = async (req, res) => {
    try {
        // Buscar el producto por folio
        const producto = await Producto.findOne({ folio: req.body.folio });
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

        // Actualizar los campos en el producto
        if (req.body.descripcion != null) producto.descripcion = req.body.descripcion;
        if (req.body.costo != null) producto.costo = req.body.costo;
        if (req.body.precio != null) producto.precio = req.body.precio;
        if (req.body.venta != null) producto.venta = req.body.venta;
        if (req.body.menu != null) producto.menu = req.body.menu;

        // Guardar el producto actualizado
        const updatedProducto = await producto.save();

        // Buscar si existe un documento en Menu con el mismo folio
        const menuDoc = await Menu.findOne({ folio: req.body.folio });

        if (menuDoc) {
            // Si existe, actualizar los campos de Menu
            if (req.body.descripcion != null) menuDoc.descripcion = req.body.descripcion;
            if (req.body.menu != null) menuDoc.menu = req.body.menu;
            if (req.body.precio != null) menuDoc.precio = req.body.precio;

            // Guardar los cambios en el documento de Menu
            await menuDoc.save();
        } else {
            // Si no existe en Menu, NO crear un nuevo documento (Evitar duplicados)
            // Sólo actualizamos si ya existe
            console.log('No se creó un nuevo documento en Menu, porque ya existe uno con el folio:', req.body.folio);
        }

        // Enviar respuesta con el producto actualizado
        res.json(updatedProducto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


//menu filtro 
