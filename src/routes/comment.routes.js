// Proceso 35 Creacion de rutas para mapear los controllers
// donde las rutas deben concordar con las declaradas en los controladores

const { Router } = require("express");

module.exports = function({ CommentController }){
    const router = Router();

    router.get("/:comentId/unique", CommentController.get); //se mantendra el scope de CommentController por el bind que hicimos en container.js
    router.get("/:ideaId", CommentController.getIdeaComments);  
    router.post("/:ideaId", CommentController.createComment);  
    router.patch("/:commentId", CommentController.update);
    router.delete("/:commentId", CommentController.delete);

    return router;
};


// 36 completado el archivo se ingresa en el index.routes.js