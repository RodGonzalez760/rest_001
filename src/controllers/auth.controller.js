// 42 crear auth.controller.js

let _authService = null;

class AuthController {
    constructor({AuthService}){
        _authService = AuthService;
    }

    // reciben un response y un request de express
    async signUp(req, res){
        // solicita el body de nuestro request
        const { body } = req;
        // crea el usuario
        const createdUser = await _authService.signUp(body);
        return res.status(201).send(createdUser);

    }

    async signIn(req, res){
        const { body } = req;
        // solicita las credenciales
        const creds = await _authService.signIn(body);
        // por defecto entrega el status 200 cuando utilizamos .send de nuestro objeto response
        return res.send(creds);
    }
}


module.exports = AuthController;

// 43 Terminado el proceso 42 exportamos en el index.js de \controllers\ , también configurarlo en awilix en el container.js
// y luego vamos a crear y configurar las rutas para el controlador