// 47 - Crear middleware parse-int
// el que nos va a ayudar a castear los querys Strings numericos a tipos numericos, y ¿por que pasa esto?
// resulata q las API en node.js los queryString viajan como si fueran de tipo String, siendo que gralmente los necesitamos de tipo number
// por ej: tenemos myapi.com?pageNum=5      /este numero 5 viaja como String dentro de un JSON, y aquí es donde lo capturamos y volvemos un n°

// primero vamos a agregar este middleware al index.js de \middlewares\ para exportarlo


module.exports = function(req, res, next){
    const queryStrings = req.query;

    for (const key in queryStrings) {
        const length = queryStrings[key].length;
        const isValid = length > 20 ? false : !isNaN(parseInt(queryStrings[key]));
        if (isValid) {
            queryStrings[key] = parseInt(queryStrings[key]);
            
        }
    }

    req.query = queryStrings;
    next();
}

// 48 hecho el paso 47, vamos a moduficar el base.repository.js en el metodo getAll() ya que es quien devuelve todos los recursos
