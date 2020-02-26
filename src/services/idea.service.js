// Proceso 31 creacion y configuración de nuestros servicios
const BaseService = require('./base.service');
let _ideaRepository = null;

class IdeaService extends BaseService{
    constructor({IdeaRepository}){
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }

    // trae todas las ideas de un usuario
    async getUserIdeas(author){
        if(!author){
            const error = new Error();
            error.status = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        return await _ideaRepository.getUserIdeas(author);
    }

    // Las ideas pueden tener votos positivos y negativos
    // Genera voto Positivo
    async upvoteIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaId must be sent";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);
        
        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "idea does not exist";
            throw error;
        }

        // enviamos a la BD 
        idea.upvotes.push(true);       
        return await _ideaRepository.update(ideaId, {upvotes: idea.upvotes});
    }

    // Genera voto Negativo
    async downvoteIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaId must be sent";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);

        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "idea does not exist";
            throw error;
        }

        idea.downvotes.push(true);

        // enviamos a la BD
        return await _ideaRepository.update(ideaId, {downvotes: idea.downvotes});
    }

}

module.exports = IdeaService;

// 32 Terminado este proceso continuamos creando el resto de servicios y luego procedemos a crear los controllers