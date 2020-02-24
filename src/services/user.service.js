// Proceso 31 creacion y configuración de nuestros servicios
const BaseService = require('./base.service');
let _userRepository = null;

class UserService extends BaseService{
    constructor({ UserRepository}){
        super(UserRepository);
        _userRepository = UserRepository;
    }

    async getUserByUserName(username){
        return await _userRepository.getUserByUserName(username)
    }
}

module.exports = UserService;

// 32 Terminado este proceso continuamos creando el resto de servicios y luego 