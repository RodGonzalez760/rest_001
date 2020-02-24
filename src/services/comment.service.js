// Proceso 31 creacion y configuración de nuestros servicios
const BaseService = require('./base.service');
let _commentRepository = null, _ideaRepository;

class CommentService extends BaseService{
    constructor({ CommentRepository, IdeaRepository}){
        super(CommentRepository);
        _commentRepository = UserRepository;
        _ideaRepository = IdeaRepository;
    }

    // Trae los comentarios de una idea en especifico
    async getIdeaComment(ideaId){
        // si no encuentra
        if(!ideaId){
            const error = new Error();
            const ststus = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        // si encuentra
        const idea = await _ideaRepository.get(ideaId);

        // si no existe
        if(!idea){
            const error = new Error();
            const ststus = 404;
            error.message = "Idea does not exist";
            throw error;
        }

        // si existe, destructuramos los comments de dicha idea
        const { comments } = idea;
        return comments;
    }

    // averiguamos a que idea se le va a crear el comentario y quien lo crea

    async createComment(comment, ideaId){
        // si no encuentra
        if(!ideaId){
            const error = new Error();
            const ststus = 400;
            error.message = "UserId must be sent";
            throw error;
        }


        // si encuentra
        const idea = await _ideaRepository.get(ideaId);

        // si no existe
        if(!idea){
            const error = new Error();
            const ststus = 404;
            error.message = "Idea does not exist";
            throw error;
        }

        // creamos un comentario, para que esto funcione debemos asegurarnos que en el body de nuestro POST se esté enviando el author 
        const createdComment = await _commentRepository.create( comment );
        idea.comments.push

        return await _ideaRepository.update(ideaId, {comments: idea.comments });
    }
}

module.exports = CommentService;

// 32 Terminado este proceso continuamos creando el resto de servicios y luego actualizamos el archivo container.js y probamos la app