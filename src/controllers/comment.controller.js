// 32 - Creacion de los controllers
// En el caso de los controllers no se hace un archivo base por el hecho de que el scope se pierde, sin embargo, hay formas de solucionar este problema, pero en esta ocación no se han hecho

let _commentService = null;

class CommentController {
    constructor({CommentService}){
        _commentService = CommentService;
    }

    // Metodos del controlador, req y res se los pasamos a express al hacer nuestro primer request
    async get(req, res){
        // inicializamos elestructural de nuestro request
        const { commentId } = req.params; //myapi.com/user/35456736637 donde 35456736637 es el param q debe tener un nombre
        const comment = await _commentService.get(commentId);
        return res.send(comment);

    }

    async update(req, res){
        const { body } = req;
        const { commentId } = req.params;
        const updateComment = await _commentService.update(commentId, body);
        return res.send(updateComment);
    }

    async delete(req, res){
        const {commentId} = req.params;
        const deletedComment = await _commentService.delete(commentId);
        return res.send(deletedComment);
    }

    async getIdeaComments(req, res){
        const { ideaId } = req.params;
        const comments = await _commentService.getIdeaComments(ideaId);
        return res.send(comments);
    }

    async createComment(req, res){
        const { body } = req;
        const { ideaId } = req.params;
        const createdComment = await _commentService.createdComment(body, ideaId);
        return res.status(201).send(createdComment);
    }
}

module.exports = CommentController;

// 33 Ya configurado se inserta en el index.js de \controllers\ 