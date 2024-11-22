const Empleado = require('../models/empleado');
const Sindicato = require('../models/sindicatos');

// Mostrar todos los empleados
exports.getAllEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados.map(emp => emp.showData()));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo empleado
exports.createEmpleado = async (req, res) => {
    try {
        // Buscar el sindicato por descripcion para asignarlo al campo sindicato del empleado
        const sindicato = await Sindicato.findOne({ descripcion: req.body.sindicato });
        if (!sindicato) return res.status(404).json({ message: 'Sindicato no encontrado' });

        // Crear el nuevo empleado con la información recibida
        const empleado = new Empleado({
            folio: req.body.folio,
            tipo_empleado: req.body.tipo_empleado,
            empleado: req.body.empleado,
            sindicato: sindicato.descripcion,  // Guardar el nombre del sindicato
            ganancia: req.body.ganancia
        });

        const newEmpleado = await empleado.save();
        res.status(201).json(newEmpleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/// Eliminar un empleado por folio
// Eliminar un empleado por folio
exports.deleteEmpleadoByFolio = async (req, res) => {
    try {
      const { folio } = req.body; // Recibimos el folio desde el cuerpo de la solicitud
  
      // Intentamos eliminar al empleado con el folio proporcionado
      const result = await Empleado.deleteOne({ folio });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
  
      res.json({ message: 'Empleado eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Editar un empleado por folio
exports.updateEmpleadoByFolio = async (req, res) => {
    try {
        const empleado = await Empleado.findOne({ folio: req.body.folio });
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });

        if (req.body.tipo_empleado != null) empleado.tipo_empleado = req.body.tipo_empleado;
        if (req.body.empleado != null) empleado.empleado = req.body.empleado;
        if (req.body.ganancia != null) empleado.ganancia = req.body.ganancia;

        // Actualizar el sindicato si se proporciona uno nuevo
        if (req.body.sindicato != null) {
            const sindicato = await Sindicato.findOne({ descripcion: req.body.sindicato });
            if (!sindicato) return res.status(404).json({ message: 'Sindicato no encontrado' });
            empleado.sindicato = sindicato.descripcion;
        }

        const updatedEmpleado = await empleado.save();
        res.json(updatedEmpleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
