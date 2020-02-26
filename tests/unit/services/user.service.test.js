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
// asegurandonos que nuestro código no rompe la funcionalidad que ya el software tiene