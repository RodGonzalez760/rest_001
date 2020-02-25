// Proceso 27
const BaseRepository = require('./base.repository');
let _comment = null;

class CommentRepository extends BaseRepository{
    // Este CRUD lista las ideas de todos los autores, pero necesitamos las ideas de un usuario en especifio
    constructor({ Comment }){
        super(Comment);
        _comment = Comment;
    }

}

module.exports = CommentRepository;

// 28.-Terminado el proceso 27 para todas las entidades agregamos al index.js de repositories