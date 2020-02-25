// 3.-Creado el archivo, configuraremos nuestro contenedor de inyeccion de dependencia.
const { createContainer, asClass, asValue, asFunction } = require("awilix"); 

// 13.-
// config
const config = require('../config');

// 15.-llama a nuestra app->
const app = require('.');

// 6 y 31.-importamos services
const { 
    HomeService, 
    UserService, 
    IdeaService, 
    CommentService,
    AuthService
} = require('../services');

// 8.-controllers, importo HomeController desde la capa controllers->register
const { 
    HomeController, 
    UserController, 
    IdeaController, 
    CommentController,
    AuthController
} = require('../controllers');

// 11.-routes, importamos HomeRoutes desde index.routes->register
const { 
    HomeRoutes, 
    UserRoutes, 
    IdeaRoutes, 
    CommentRoutes,
    AuthRoutes
} = require('../routes/index.routes');

// 13.-configuración del nuevo route -> register
const Routes = require("../routes");

// 25.-models, importamos desde la capa models->a register
const { User, Comment, Idea } = require("../models");

// 29.-repositories, importamos desde la capa repositories->a register
const { 
    UserRepository, 
    IdeaRepository, 
    CommentRepository 
} = require("../repositories");

const container = createContainer();


// 6.-metodo register para crear un nuevo tipo de inyeccion
            // **NOTA** : Se puede hacer 1 register con todos los metodos, se hizo así solo para segmentarlo más.
container
.register({
    app: asClass(app).singleton(),                          //15
    router: asFunction(Routes).singleton(),                 //13.-
    config: asValue(config)
}).register({
    HomeService: asClass(HomeService).singleton(),       //se usa en el home.controller.js -> constructor({ HomeService }){}
    UserService: asClass(UserService).singleton(),      // 31
    CommentService: asClass(CommentService).singleton(),  //31
    IdeaService: asClass(IdeaService).singleton(),       //31
    AuthService: asClass(AuthService).singleton()       //41
}).register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),   //mantiene el scope para que no se pierda    
    UserController: asClass(UserController.bind(UserController)).singleton(),   //34
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),   //34
    CommentController: asClass(CommentController.bind(CommentController)).singleton(),   //34
    AuthController: asClass(AuthController.bind(AuthController)).singleton() // 42
}).register({
    HomeRoutes: asFunction( HomeRoutes ).singleton(),    //11.-ya que en home.routes exportamos un funcion 
    UserRoutes: asFunction( UserRoutes ).singleton(),       //37
    IdeaRoutes: asFunction( IdeaRoutes ).singleton(),       //37
    CommentRoutes: asFunction( CommentRoutes ).singleton(),  //37
    AuthRoutes: asFunction( AuthRoutes ).singleton()     //46
}).register({
    User: asValue(User),                    //25.-el objeto será inyectado como tal
    Idea: asValue(Idea),
    Comment: asValue(Comment)
}).register({                               //29
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton()
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

// 26.-Terminado el punto 25 estamos listos para crear nuestros repositorios, creando los archivos en \src\repositories\base.repository.js

// 30 Terminado el paso 29 para la configuración de los repositorios, procederemos a crear los Servicios al \services\ con un base.service.js

// 31 Terminado el paso 30 procedemos a crear los controllers

// 35 Terminado el paso 34 probamos que la app no tenga errores y procedemos a crear las rutas para nuestra app en \routes\

// 38 Configuradas las rutas de nuestros controladores(paso 37) se deben configurar en el index.js de \routes\

// 47 Configuradas las rutas de nuestro Auth (paso 46) probamos que la app no contenga errores y si está correcto podremos utilizar el middleware
// que hemos creado para así proteger las rutas que queramos, por ej. ahora vamos a proteger la ruta user, entonces vamos al \routes\user.routes.js
// y agregamos lo siguiente impportando const { AuthMiddleware } = require('../middlewares'); y agregamos AuthMiddleware a la ruta antes del metodo que resuelve dicha ruta