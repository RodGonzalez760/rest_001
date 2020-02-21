// 12.-Este archivo es el Router principal, será el encargado de inyectar los middlewares que 
// queramos y hacer las configuraciones de todas las rutas.

const express = require('express');
//12 solicitamos los middlewares
const cors = require('cors');                   //middleware
const helmet = require('helmet');               //middleware
const compression = require('compression');     //middleware
require("express-async-errors");    //captura las excepciones asyncronas que producen las promesas
// 21.-nuevos middlewares
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");

module.exports = function({ HomeRoutes }){
    // 12
    const router = express.Router();
    const apiRoutes = express.Router();

    //12 configuramos los default middlewares
    apiRoutes
        .use(express.json()) //convierte peticiones POST del body
        .use(cors())
        .use(helmet())
        .use(compression());

    // 12 apiRoutes usa las rutas de home
    apiRoutes.use("/home", HomeRoutes );

    router.use("/v1/api", apiRoutes);

    // 21.-Nuevos Middlewares
    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);


    return router;
}


// 13.-Terminado el punto 12 volvemos al container.js