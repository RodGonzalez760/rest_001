// Proceso 35 Creacion de rutas para mapear los controllers
// donde las rutas deben concordar con las declaradas en los controladores

const { Router } = require("express");

// 47 importamos el middleware para proteger las rutas
//      y agregamos [AuthMiddleware] de la siguiente forma     router.get("", [AuthMiddleware], UserController.getAll);  
// 52 además agregamos el ParseIntMiddleware
const { AuthMiddleware, ParseIntMiddleware } = require('../middlewares');

module.exports = function({ UserController }){
    const router = Router();

    
    router.get("/:userId", UserController.get);  
    router.get("", [AuthMiddleware, ParseIntMiddleware], UserController.getAll);              //se mantendra el scope de UserController por el bind que hicimos en container.js
    router.patch("/:userId", UserController.update);
    router.delete("/:userId", UserController.delete);

    return router;
};


// 36 completado el archivo se ingresa en el index.routes.js

// 47 Una vez aplicada la protección de autorización a las rutas procedemos a la paginación
// para esto creamos un middleware nuevo de nombre parse-int.middleware.js