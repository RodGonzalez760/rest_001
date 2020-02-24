// Proceso 27
const BaseRepository = require('./base.repository');
let _idea = null;

class IdeaRepository extends BaseRepository{
    // Este CRUD lista las ideas de todos los autores, pero necesitamos las ideas de un usuario en especifio
    constructor({ Idea }){
        super(Idea);
        _idea = Idea;
    }

    // Para listar las ideas de un usuario en especifico
    async getUserIdeas(author){
        return await _idea.find({author}); //va a buscar todas las ideas del autor que le estamos pasando como parametro
    }


}

module.exports = IdeaRepository;

// 28.-Terminado el proceso 27 para todas las entidades agregamos al index.js de repositories