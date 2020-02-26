// Proceso 31 creacion y configuración de nuestros servicios
const BaseService = require('./base.service');
let _commentRepository = null, _ideaRepository;

class CommentService extends BaseService{
    constructor({ CommentRepository, IdeaRepository}){
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    // Trae los comentarios de una idea en especifico
    async getIdeaComments(ideaId){
        // si no encuentra
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        // si encuentra
        const idea = await _ideaRepository.get(ideaId);

        // si no existe
        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "Idea does not exist";
            throw error;
        }

        // si existe, destructuramos los comments de dicha idea
        const { comments } = idea;
        return comments;
    }

    // averiguamos a que idea se le va a crear el comentario y quien lo crea

    async createComment(comment, ideaId, userId){
        // si no encuentra
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "UserId must be sent";
            throw error;
        }


        // si encuentra
        const idea = await _ideaRepository.get(ideaId);

        // si no existe
        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "Idea does not exist";
            throw error;
        }

        // creamos un comentario, para que esto funcione debemos asegurarnos que en el body de nuestro POST se esté enviando el author 
        //  {...comment, author: userId}  esto es un operador rest para ligar propiedades al objeto que estamos creando, donde userId es el 3er parametro que recibimos en la función
        const createdComment = await _commentRepository.create( {...comment, author: userId} );
        idea.comments.push(createdComment);

        return await _ideaRepository.update(ideaId, {comments: idea.comments });
    }
}

module.exports = CommentService;

// 32 Terminado este proceso continuamos creando el resto de servicios y luego actualizamos el archivo container.js y probamos la app
// 32 finalmente procedemos a crear los controllers