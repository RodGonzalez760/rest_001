// 39 Creación de los helpers
// Este helper nos ayuda a crear los tokens para nuestra app

// el metodo sign sirve para firmar los tokens
const { sign } = require("jsonwebtoken");

// importamos el secret de nuestro token
// Previamente debemos ir a \config\index.js para agregar el JWT con JWT_SECRET: process.env.JWT_SECRET
// igualmente debemos agregarla en el \.env con JWT_SECRET=muchos_caracteres
// hecho esto ya podemos llamar al JWT_SECRET
const { JWT_SECRET } = require('../config');


// esto lo podemos hacer ya que exports es un Objeto, por ende se le pueden agregar funcionalidades como en este caso
module.exports.generateToken = function(user){
    // param1: Objeto user(que va a encriptar), param2:palabra secreta de nuestro token, param3: tiempo de expiracion
    // toda esta linea retorna un token que tendrá un tamaño distinto de acuerdo al nombre del usuario.
    return sign({user}, JWT_SECRET, { expiresIn: "4h"});
};


// 40 ya configurado lo exportamos en el index.js de \helpers\