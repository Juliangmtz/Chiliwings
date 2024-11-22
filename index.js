require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//va el puerto del cluster entre ('')
const uri = 'mongodb+srv://establecimientochiliwings:1234@establecimientochiliwin.kyns6.mongodb.net/';
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
}

run();

// Import routes

const sindicatoController = require('./routes/sindicatos-routes');
const empleadoController = require('./routes/empleado-routes');
const productoController = require('./routes/producto-routes');
const clienteController = require('./routes/clientes-routes');


const validacionesController = require('./routes/000(parametros-routes)');

const menucontroller = require('./routes/menu-routes');

const ordenesController = require('./routes/011-012-routes');

const ordenesControllerFinales = require('./routes/orden-routes')



//use routes

app.use('/sindicato', sindicatoController);
app.use('/empleado', empleadoController);
app.use('/productos', productoController);
app.use('/clientes', clienteController);

app.use('/validaciones', validacionesController );
app.use('/menu', menucontroller );
app.use('/generarcomanda', ordenesController);
app.use('/orden', ordenesControllerFinales )



//debe ser el puerto por defecto el (4000) y va entre comillas paradas (`)
app.listen(8000, () => {
    console.log(`Server running at http://localhost:${8000}`);
  });