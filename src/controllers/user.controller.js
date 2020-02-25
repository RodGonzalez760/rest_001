// 32 - Creacion de los controllers
// En el caso de los controllers no se hace un archivo base por el hecho de que el scope se pierde, sin embargo, hay formas de solucionar este problema, pero en esta ocación no se han hecho

let _userService = null;

class UserController {
    constructor({UserService}){
        _userService = UserService;
    }

    // Metodos del controlador, req y res se los pasamos a express al hacer nuestro primer request
    async get(req, res){
        // inicializamos elestructural de nuestro request
        const { userId } = req.params; //myapi.com/user/35456736637 donde 35456736637 es el param q debe tener un nombre
        const user = await _userService.get(userId);
        return res.send(user);

    }

    async getAll(req, res){
        const users = await _userService.getAll();
        return res.send(users);
    }

    async update(req, res){
        const { body } = req;
        const { userId } = req.params;
        const updateUser = await _userService.update(userId, body);
        return res.send(updateUser);
    }

    async delete(req, res){
        const {userId} = req.params;
        const deletedUser = await _userService.delete(userId);
        return res.send(deletedUser);
    }
}

module.exports = UserController;

// 33 Ya configurado se inserta en el index.js de \controllers\ 