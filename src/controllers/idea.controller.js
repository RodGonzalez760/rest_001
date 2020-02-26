// 32 - Creacion de los controllers
// En el caso de los controllers no se hace un archivo base por el hecho de que el scope se pierde, sin embargo, hay formas de solucionar este problema, pero en esta ocación no se han hecho
let _ideaService = null;
class IdeaController {
    constructor({IdeaService}){
        _ideaService = IdeaService;
    }

    // Metodos del controlador, req y res se los pasamos a express al hacer nuestro primer request
    async get(req, res){
        // inicializamos elestructural de nuestro request
        const { ideaId } = req.params;                  //myapi.com/user/35456736637 donde 35456736637 es el param q debe tener un nombre
        const idea = await _ideaService.get(ideaId);
        return res.send(idea);
    }

    async getAll(req, res){
        // 51 paginación, destructuramos y enviamos al metodo getAll()
        const { pageSize, pageNum } = req.query;
        const ideas = await _ideaService.getAll(pageSize, pageNum);
        return res.send(ideas);
    }

    async create(req, res){
        const { body } = req;
        const createdIdea = await _ideaService.create(body);
        return res.status(201).send(createdIdea);
    }

    async update(req, res){
        const { body } = req;
        const { ideaId } = req.params;
        const updatedIdea = await _ideaService.update(ideaId, body);
        return res.send(updatedIdea);
    }

    async delete(req, res){
        const {ideaId} = req.params;
        const deletedIdea = await _ideaService.delete(ideaId);
        return res.send(deletedIdea);
    }

    async getUserIdeas(req, res){
        const { userId } = req.params;
        const ideas = await _ideaService.getUserIdeas(userId);
        return res.send(ideas);
    }

    async upvoteIdea(req, res){
        const { ideaId } = req.params;
        const idea = await _ideaService.upvoteIdea(ideaId);
        return res.send(idea);
    }

    async downvoteIdea(req, res){
        const { ideaId } = req.params;
        const idea = await _ideaService.downvoteIdea(ideaId);
        return res.send(idea);
    }
    
}

module.exports = IdeaController;

// 33 Ya configurado se inserta en el index.js de \controllers\ 

// 52 - agregadas las paginaciónes correspondientes debemos configurar las rutaas para que las rutas parseen la información necesaria
// para este caso lo necesitamos en user.routes.js y idea.routes.js