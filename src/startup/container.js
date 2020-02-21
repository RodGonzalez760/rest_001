// 3.-Creado el archivo, configuraremos nuestro contenedor de inyeccion de dependencia.
const { createContainer, asClass, asValue, asFunction } = require("awilix"); 

// 13.-
// config
const config = require('../config');
// 15.-llama a nuestra app->
const app = require('.')

// 6.-importamos services
const { HomeService } = require('../services');

// 8.-controllers, importo HomeController desde la capa controllers->register
const { HomeController } = require('../controllers')

// 11.-routes, importamos HomeRoutes desde index.routes->register
const { HomeRoutes } = require('../routes/index.routes');

// 13.-configuración del nuevo route -> register
const Routes = require("../routes");

const container = createContainer();


// 6.-metodo register para crear un nuevo tipo de inyeccion
            // **NOTA** : Se puede hacer 1 register con todos los metodos, se hizo así solo para segmentarlo más.
container
.register({
    app: asClass(app).singleton(),                          //15
    router: asFunction(Routes).singleton(),                 //13.-
    config: asValue(config)
}).register({
    HomeService: asClass(HomeService).singleton()       //se usa en el home.controller.js -> constructor({ HomeService }){}
}).register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton()   //mantiene el scope para que no se pierda    
}).register({
    HomeRoutes: asFunction( HomeRoutes ).singleton()    //11.-ya que en home.routes exportamos un funcion 
});
// 7.-nuevo controller \controllers\home.controller.js

// 9.-podemos proceder a crear nuestras rutas para enlazar este controlador con nuestras rutas
    // creamos en \routes\index.routes.js y \routes\home.routes.js

module.exports = container;

// 4.-Hecho esto, crearemos un servicio en \src\services\home.services.js

// 5.-después de home.service.js


// 12.-terminado el punto 11 vamos al \routes\index.js


//14.-terminado el punto 13, vamos al \startup\index.js

//16.-hecho el paso 15 volvemos al \startup\index.js