// Proceso 35 Creacion de rutas para mapear los controllers
// donde las rutas deben concordar con las declaradas en los controladores

const { Router } = require("express");

module.exports = function({ IdeaController }){
    const router = Router();

    router.get("", IdeaController.getAll);          
    router.get("/:ideaId", IdeaController.get);  
    router.get("/:userId/all", IdeaController.getUserIdeas);         
    router.post("", IdeaController.create);
    router.patch("/:ideaId", IdeaController.update);
    router.delete("/:ideaId", IdeaController.delete);
    router.post(":ideaId/upvote", IdeaController.upvoteIdea);
    router.post(":ideaId/downvote", IdeaController.downvoteIdea);

    return router;
};


// 36 completado el archivo se ingresa en el index.routes.js