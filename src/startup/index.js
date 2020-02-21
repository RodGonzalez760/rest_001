// CONFIGURACIÓN DE NUESTRO ENTORNO
// ESTA CLASE DE INICIO A NUESTRA APLICACIÓN


// 14.-
const express = require("express");

let _express = null;
let _config = null;

class Server {
    // 16
    constructor({ config, router }){
        // 16 inicializamos config y router
        _config = config;
        _express = express().use(router);
    }

    // 16.-metodo start va a retornar una promesa que va a iniciar nuestro server
    start(){
        return new Promise(resolve => {
            _express.listen(_config.PORT, () => {
                console.log(
                    _config.APPLICATION_NAME + " API running on port " + _config.PORT
                );                
                resolve();
            });
        });
    } 
}

module.exports = Server;


// 15.- Volvemos al containetr.js

//17.- terminado el punto 16 vamos al index.js de la raíz.