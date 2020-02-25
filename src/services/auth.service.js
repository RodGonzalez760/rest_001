// 41 Creación del servicio de autenticación

//llama al helper para generar token cuando sea necesario 
const { generateToken } = require('../helpers/jwt.helper');

// importamos el repositorio de usuario
let _userService = null;

class AuthService {
    // para la inyeccion de dependencias UserService ya configurado en awilix
    constructor({UserService}){
        _userService = UserService;
    }


    // Metodos
    async signUp(user){
        // extraemos el username del usuario q recibe para el inicio de sesión
        const {username} = user;
        // validamos que exista un usuario con este username, por esto hemos creado un metodo antes en el user.service.js llamado getUserByUserName(username)
        // ¿Existe el Usuario?
        const userExist = await _userService.getUserByUsername(username);

        // Si existe no puede haber 2 usuarios con el mismo username
        if(userExist){
            const error = new Error();
            error.status = 400;
            error.message = 'User Already Exist';
            throw error;
        }

        // si no existe, creará el nuevo usuario
        return await _userService.create(user);

    }

    async signIn(user){
        // Extraemos username y password
        const { username, password } = user;
        // ¿Existe el usuario?
        const userExist = await _userService.getUserByUsername(username);

        // No existe el usuario, error
        if (!userExist) {
            const error = new Error();
            error.status = 404;
            error.message = "User does not exist";
            throw error;
        }

        // Si existe el usuario, comparamos la contraseña encriptada
        // por esto hemos creado el metodo comparePasswords en el user.model.js
        const validPassword = userExist.comparePasswords(password);
        // si no es valida, error
        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message = "Invalid Password";
            throw error;
        }

        // Creamos un objeto para encriptar en nuestro token
        const userToEncode = {
            username: userExist.username,
            id: userExist._id
        };

        // genera un token
        const token = generateToken(userToEncode);

        // retorna el objeto con el token y en el usuario devuelva el userExist
        return { token, user: userExist };

    }
}


module.exports = AuthService;

// 42 Terminado el proceso 41 exportamos este archivo al index.js de \services\ , solicitamos y configuramos el servicio en container.js
// y nos vamos a crear el controller para este servicio