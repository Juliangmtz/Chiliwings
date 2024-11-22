const Sindicato = require('../models/sindicatos');

// Crear un nuevo sindicato
exports.createSindicato = async (req, res) => {
  const sindicato = new Sindicato({
    folio: req.body.folio,
    descripcion: req.body.descripcion
  });

  try {
    const newSindicato = await sindicato.save();
    res.status(201).json(newSindicato);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mostrar todos los sindicatos
exports.getAllSindicatos = async (req, res) => {
  try {
    const sindicatos = await Sindicato.find();
    res.json(sindicatos.map(s => s.showData()));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Editar un sindicato por folio
exports.updateSindicatoByFolio = async (req, res) => {
  try {
    // Buscar el sindicato por el folio
    const sindicato = await Sindicato.findOne({ folio: req.body.folio });
    if (!sindicato) return res.status(404).json({ message: 'Sindicato no encontrado' });

    // Actualizar los campos necesarios
    if (req.body.new_folio != null) sindicato.folio = req.body.new_folio;
    if (req.body.descripcion != null) sindicato.descripcion = req.body.descripcion;

    const updatedSindicato = await sindicato.save();
    res.json(updatedSindicato);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un sindicato por folio
exports.deleteSindicatoByFolio = async (req, res) => {
  try {
    const sindicato = await Sindicato.findOne({ folio: req.body.folio });
    if (!sindicato) return res.status(404).json({ message: 'Sindicato no encontrado' });

    await sindicato.remove();
    res.json({ message: 'Sindicato eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
