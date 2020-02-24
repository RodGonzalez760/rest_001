// Proceso 31 creacion y configuración de nuestros servicios
const BaseService = require('./base.service');
let _IdeaRepository = null;

class IdeaService extends BaseService{
    constructor({IdeaRepository}){
        _IdeaRepository = IdeaRepository;
    }

    // trae todas las ideas de un usuario
    async getUserIdeas(author){
        if(!author){
            const error = new Error();
            const ststus = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        return await _IdeaRepository.getUserIdeas(author);
    }

    // Las ideas pueden tener votos positivos y negativos
    // Genera voto Positivo
    async upvoteIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            const ststus = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        const idea = await _IdeaRepository.get(ideaId);
        if(!idea){
            const error = new Error();
            const ststus = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        idea.upvotes.push(true);

        // enviamos a la BD
        return await _IdeaRepository.update(ideaId, {upvotes: idea.upvotes})
    }

    // Genera voto Negativo
    async downvoteIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            const ststus = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        const idea = await _IdeaRepository.get(ideaId);
        if(!idea){
            const error = new Error();
            const ststus = 400;
            error.message = "UserId must be sent";
            throw error;
        }

        idea.downvotes.push(true);

        // enviamos a la BD
        return await _IdeaRepository.update(ideaId, {upvotes: idea.downvotes})
    }

}

module.exports = IdeaService;

// 32 Terminado este proceso continuamos creando el resto de servicios y luego 