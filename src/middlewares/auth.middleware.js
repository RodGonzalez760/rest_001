// 45 crear middleware para la autenticación

const jwt = require("jsonwebtoken");
// Requiere el secret de nuestro token para desencriptar nuestra info
const { JWT_SECRET } = require("../config");

// el next recordemos da el paso al siguiente middleware en la cadena de middlewares de express
module.exports = function(req, res, next){
    // buscamos nuestro token desde el headers del request
    const token = req.headers["authorization"];
    // validamos que haya un token
    if (!token) {
        const error = new Error();
        error.message = "Token must be sent";
        error.status = 400;
        throw error;
    }

    // si existe hayy que validarlo
    // decodedToken = es lo que estamos desencriptando  
    jwt.verify(token, JWT_SECRET, function(err, decodedToken) {
        // si el token es invalido
        if (err) {
            const error = new Error();
            error.message = "Invalid Token";
            error.status = 401;
            throw error;            
        }

        // si el token es válido, extrae el user, y lo dejamos en el request de express, asi por cada req. que haga un usuario sabrá quien realmente está autenticado
        req.user = decodedToken.user;
        next(); 
    });
};

// este middleware despues se debe configurar en las rutas que queramos proteger
// 46 creado el middleware(paso 45) vamos a la configuración en container.js
