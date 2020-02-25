// 54 Proceso 54 crear middleware cache.middleware.js
// de manera que los recursos si ya se han solicitado y no han presentado cambios puedan ser retornados de forma rápida
// vamos entonces a crear un nuevo middleware para esta función llamado cache.middleware.js

// solicitamos el package memory-cache
const  mcache = require('memory-cache');

// importamos la variable de entorno
const { CACHE_KEY } = require('../config');

module.exports = function(duration){
    return (req, res, next) => {
        // creamos un id unico
        const key = CACHE_KEY + req.originUrl || req.url;
        // si hay algo cacheado con ese key lo retornará
        const cachedBody = mcache.get(key);
        // si hay una caché creada retornamos un JSON con el cache
        if (cachedBody) {
            return res.send(JSON.parse(cachedBody));            
        }else {
            // sino, es por que es la primera vez que carga, por lo que hauy que realizar caché, asignando el send a la nueva propiedad
            res.sendResponse = res.send;
            // ahora reescribimos el res.send con una funcion que recibe un body que tiene el reecurso a cachear
            res.send = body => {                 
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    };
};


// 55 Terminado el middleware(paso 54), lo exportamos por medio del index.js de \middlewares\
// y vamos a crear un helper que nos ayude a medir el tiempo cache-time.helper.js