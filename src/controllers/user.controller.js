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

    // 50 agregamos la paginación
    async getAll(req, res){
        // 50 destructuramos y enviamos al metodo getAll()
        const { pageSize, pageNum } = req.query;
        const users = await _userService.getAll( pageSize, pageNum );
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

// 51 - agregada la paginación(paso 50) debemos agregarla tambien en idea.controller.js , **NOTA** La paginación se utiliza en todos los controladores donde exista la función getAll() o su equivalente.
