// 64-creamos el archivo user.service.test.js

const { UserService } = require("../../../src/services");
const { UserRepositoryMock } = require("../../mocks");
let { userModelMock: { user, users }  } = require('../../mocks');

describe("User Service Tests", () => {
  beforeEach(() => {
      // Este es un Hook
    jest.clearAllMocks();
  });

//   TEST: Solicita un usuario por su id
  it("Should find a user by id", async () => {
    //   esta variable hace referencia a nuestro user.repository.mock.js
    const UserRepository = UserRepositoryMock;
    // donde el valor que retorne dicha funcion(get) se le pasa el objeto user
    UserRepository.get.mockReturnValue(user);

    // entonces crea un objeto de user service al que se le pasa un repositorio(que ya tiene una funcion get q retorna un valor en especifico, por lo que puedo inyectarla de forma explicita)
    const _userService = new UserService({ UserRepository });    
    const expected = await _userService.get(user._id);
    // entonces comparamos para que el resultado de expected sea igual al user
    expect(expected).toMatchObject(user);
  });

    // TEST: Encuentra un usuario por su username
  it("Should find a user by username", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getUserByUsername.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getUserByUsername(user.username);
    expect(expected).toMatchObject(user);
  });

    // TEST: Entrega a todos los usuarios
  it("Should return a user collection", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getAll.mockReturnValue(users);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getAll();
    expect(expected).toMatchObject(users);
  });

    // TEST: Actualiza un usuario por su id
  it("Should update a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.update.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.repository.update(user._id, user);
    expect(expected).toMatchObject(user);
  });

    // TEST: elimina un usuario especifico por su id
  it("Should delete a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.delete.mockReturnValue(true);

    const _userService = new UserService({ UserRepository });

    const expected = await _userService.repository.delete(user._id);
    expect(expected).toEqual(true);
  });


});



// 65 - terminada la configuración del test podremos realizar el resto de Test para las demás entidades 

// **NOTA** Los test tienen vital importancia ya que garantizan la calidad de nuestro código cuando realizamos continuos integration
// para la integración de nuestro código a un repositorio de producción, de manera que solamente se podrá realizar integración si todos
// los tests pasan, cada vez que se agrega una funcionalidad nueva a un software ya existente, es una buena practica realizarle tests,
// asegurandonos que nuestro código no rompe la funcionalidad que ya el software tiene.


// 66 - UNA VEZ TERMINADA LA IMPLEMENTACIÓN DE TODOS LOS TESTS PARA LA APLICACIÓN, PROCEDEMOS AL DESARROLLO DE LA DOCUMENTACIÓN,
// Y PARA ESTO CRAREMOS UN NUEVO DIRECTORIO= \config\swagger y dentro crearemos 2 archivos JSON swaggerDEV.json y swaggerPROD.json


// 67 - CREADOS EL DIRECTORIO Y LOS ARCHIVOS PARA SWAGGER VAMOS A INTEGRARLOS A LA APLICACION
// (1) Vamos al archivo .env y agregamos SWAGGER_DOC=swaggerDEV (correspondiente a ambiente de desarrollo)
// (2) Vamos al archivo \config\index.js y agregamos la variable SWAGGER_PATH: `../config/swagger/${process.env.SWAGGER_DOC}.json`
//      con esto nos aseguramos que se configura el archivo que estemos usando según sea nuestro ambiente(desarrollo o producción)
// (3) Vamos al archivo \routes\index.js y solicitamos los archivos de swagger
// (4) terminados los pasos anteriores vamos a probar la app con > npm run dev
//      para las pruebas quitamos la caché y la autenticacion de nuestro usuario en el archivo \routes\user.routes.js
//   (original)   router.get("", [ParseIntMiddleware, CacheMiddleware( CACHE_TIME.ONE_HOUR )], UserController.getAll);
//   (pruebas)    router.get("", [ParseIntMiddleware], UserController.getAll);

// =========================================API COMPLETA====================================
// Realizaremos los toques finales de nuestra API
// (1) pruebas endpoints vía postman
        // (get)          localhost:5000/v1/api/user
        // (get)          localhost:5000/v1/api/user/5e55533535ef2b550004d890
        // (patch envía body con la propiedad del usuario a actualizar tipo json por ej: {"username": "Rodrigao"}) 
              //          localhost:5000/v1/api/user/5e55533535ef2b550004d890
        // (delete)       localhost:5000/v1/api/user/5e55533535ef2b550004d890
        // (post)         localhost:5000/v1/api/auth/signin
        // (post)         localhost:5000/v1/api/auth/signup
        // (get)          localhost:5000/v1/api/idea
        // (post)         localhost:5000/v1/api/idea/5e5591d6a256295580f1ecdf/upvote
        // (post)         localhost:5000/v1/api/idea/5e5591d6a256295580f1ecdf/downvote
        // (get)          localhost:5000/v1/api/idea/5e5591d6a256295580f1ecdf
        // (patch)        localhost:5000/v1/api/idea/5e5591d6a256295580f1ecdf
        // (post)         localhost:5000/v1/api/idea
        // (delete)       localhost:5000/v1/api/idea/5e56933701ea4d56502a373d
        // (get)          localhost:5000/v1/api/idea/5e558da1db03ca37a0285122/all
        // (post)         localhost:5000/v1/api/comment/5e5591d6a256295580f1ecdf      //idIdea
        // (get)          localhost:5000/v1/api/comment/5e56998dadcab93640828269/unique     //idComment
        // (get)          localhost:5000/v1/api/comment/5e5591d6a256295580f1ecdf            //idIdea
        // (patch)        localhost:5000/v1/api/comment/5e56998dadcab93640828269            //idComment
        // (delete)       localhost:5000/v1/api/comment/5e56998dadcab93640828269            //idComment

              
// Formato crreación de usuarios (post) localhost:5000/v1/api/auth/signup
// {
//   "name": "StaniaRod",
//   "username": "StaniaRod",
//   "password": "myStrongPassword"
// }

// Formato para autenticarse y obtener token (post) localhost:5000/v1/api/auth/signin
// {
// 	"username": "StaniaRod",
// 	"password": "myStrongPassword"
// }
// para autenticarnos agregar un key Authorization con el token obtenido

