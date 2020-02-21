// 7.-
// esta clase no va a necesitar nada, ya que awilix le va a inyectar lo que ella solicite
let _homeService = null

class HomeController {
    // el nombre HomeService debe coincidir con el 
    //           HomeService: del container.js
    constructor({ HomeService }){
        // inicializamos _homeService, sin this para que sea privado
        _homeService = HomeService;
    } 

    index(req, res){
        return res.send(_homeService.index())
    }

}

module.exports = HomeController;

// 8.-exporto por \controllers\index.js
// configurar controller para que esté disponible para la inyección de dependencia
// vuelvo a container.js