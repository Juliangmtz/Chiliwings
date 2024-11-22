// Importamos el modelo Menu
const Menu = require('../models/menu');  

// Ajusta la ruta del modelo según tu estructura



exports.getTodosLosProductos = async (req, res) => {
    try {
        // Obtener todos los productos sin filtrar por categoría
        const productos = await Menu.find();  // No se aplica filtro aquí

        if (!productos || productos.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }

        // Devolver todos los productos
        res.json(productos);
    } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).json({ message: err.message });
    }
};
