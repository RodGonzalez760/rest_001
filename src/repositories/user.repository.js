// Proceso 27 - Repositorio de la Entidad USER

// Primero, como heredará de baseRepository hay que importarlo
// ***NOTA*** Al importarlo en cada archivo de entidad y no en el index.js, nos aseguramos de que no se presentará a otras capas, sino se mantendrá en la capa repositories
const baseRepository = require('./base.repository');
let _user = null;

class UserRepository extends baseRepository{
    // llamamos al constructor de la clase padre y le pasamos la entidad
    constructor( User ){
        super( User );
        _user = User;
    }

    // Retorna un usuario (si existe) a travez de su nombre de usuario, así para poder acceder a nuestra entidad User es que se creó la 
    // variable _user de forma privada
    async getUserByUsername(username){
        return await _user.findOne({ username });
    }

}

module.exports = UserRepository;

// 28.-Terminado el proceso 27 para todas las entidades agregamos al index.js de repositories