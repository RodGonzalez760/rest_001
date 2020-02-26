// Proceso 35 Creacion de rutas para mapear los controllers
// donde las rutas deben concordar con las declaradas en los controladores

const { Router } = require("express");
// 
const { AuthMiddleware } = require('../middlewares');

module.exports = function({ CommentController }){
    const router = Router();

    router.get("/:commentId/unique", CommentController.get); //se mantendra el scope de CommentController por el bind que hicimos en container.js
    router.get("/:ideaId", CommentController.getIdeaComments);  
    router.post("/:ideaId", AuthMiddleware, CommentController.createComment);  
    router.patch("/:commentId", AuthMiddleware, CommentController.update);
    router.delete("/:commentId", AuthMiddleware, CommentController.delete);

    return router;
};


// 36 completado el archivo se ingresa en el index.routes.js