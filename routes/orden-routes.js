const express = require('express');
const router = express.Router();
const ordenesControllerFinales = require('../contollers/orden-controller');

router.post('/', ordenesControllerFinales.cerrarOrden); // Cerrar una orden

module.exports = router;
