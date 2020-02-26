// Proceso 35 Creacion de rutas para mapear los controllers
// donde las rutas deben concordar con las declaradas en los controladores

const { Router } = require("express");

// 52 agregamos el ParseIntMiddleware
const { ParseIntMiddleware, AuthMiddleware } = require('../middlewares');

module.exports = function({ IdeaController }){
    const router = Router();

    router.get("",[ParseIntMiddleware], IdeaController.getAll);          
    router.get("/:ideaId", IdeaController.get);  
    router.get("/:userId/all", IdeaController.getUserIdeas);         
    router.post("", IdeaController.create);
    router.patch("/:ideaId", AuthMiddleware, IdeaController.update);
    router.delete("/:ideaId", AuthMiddleware, IdeaController.delete);
    router.post("/:ideaId/upvote", AuthMiddleware, IdeaController.upvoteIdea);
    router.post("/:ideaId/downvote", AuthMiddleware, IdeaController.downvoteIdea);

    return router;
};


// 36 completado el archivo se ingresa en el index.routes.js

// 53 finalizada la paginación (pag 51), podemos probar el funcionamiento de nuestra app
// para pageSize=               localhost:5000/v1/api/user?pageSize=7
// pageSize con pageNum=        localhost:5000/v1/api/user?pageSize=2&pageNum=2
// 54 Para Continuar procederemos al Caching, complementando los principios RESTful
