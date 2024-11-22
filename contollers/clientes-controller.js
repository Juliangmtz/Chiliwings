const Cliente = require('../models/clientes');

// Mostrar todos los clientes
exports.getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes.map(cli => cli.showData()));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    const cliente = new Cliente({
        folio: req.body.folio,
        cliente: req.body.cliente,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    });

    try {
        const newCliente = await cliente.save();
        res.status(201).json(newCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un cliente por folio
exports.deleteClienteByFolio = async (req, res) => {
    try {
        const cliente = await Cliente.findOneAndDelete({ folio: req.body.folio });
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Editar un cliente por folio
exports.updateClienteByFolio = async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ folio: req.body.folio });
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

        if (req.body.cliente != null) cliente.cliente = req.body.cliente;
        if (req.body.direccion != null) cliente.direccion = req.body.direccion;
        if (req.body.telefono != null) cliente.telefono = req.body.telefono;

        const updatedCliente = await cliente.save();
        res.json(updatedCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
