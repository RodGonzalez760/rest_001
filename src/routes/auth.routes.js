// 43 Crear auth.routes.js para configurar las rutas necesarias

const { Router } = require("express");

module.exports = function({ AuthController }){
    const router = Router();

    router.post("/signup", AuthController.signUp); //se mantendra el scope de CommentController por el bind que hicimos en container.js
    router.post("/signin", AuthController.signIn);  

    return router;
};


// 44 terminada la configuración de 43 lo importamos en index.routes.js y tambien la requerimos en index.js de \routes\