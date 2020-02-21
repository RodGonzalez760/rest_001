// 9.-creado

// 10.-
// importamos el Router de express
const { Router } = require("express");

// 10.-funciona como un constructor de una función
module.exports = function({ HomeController }){
    const router = Router();

    // 10.-ruta de prueba
    router.get("/", HomeController.index);  //se mantendra el scope de HomeController por el bind que hicimos en container.js

    return router;
}

// 11.-vamos a container.js a configurar la ruta