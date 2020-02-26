// 62 creamos el archivo user.repository.test.js
// ahora creamos nuestros tests como tal para user.repository

// solicitamos dependencias
const { UserRepository } = require('../../../src/repositories')
// solicitamos mockingoose
const mockingoose = require('mockingoose').default;
// solicitamos la entidad user
const { User } = require('../../../src/models');
// solicitamos nuestros mocks
let { userModelMock: { user, users }  } = require('../../mocks');

// Ahora escribimos nuestros tests
// la sintaxis de Jest es muy similar a la de mocka, chai
// es como una combinación de todas, entonces podemos tener una suit de tests(en este caso repositorio) que va a almacenar varios tests 
// para tenerlos de forma organizada.
// primer param: string, segundo param: cada uno de los tests o hooks que queramos implementar
describe("User Repository Tests", () => {
    // quiero que antes q se ejecute cada test, se aplique una lógica en especifico
// Hoock
    beforeEach(() => {        
        // de mockingoose voy a resetear todos los mockings que hayan en ese momento, y limpiar los mocks de jest
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    // creammos algunos tests     
    // Testeando el Repositorio
    // TEST: devuelve un usuario cuando lo busquemos por id
    it("should return a user by id", async () => {
        const _user = { ...user };
        // borramos el password
        delete _user.password;
        // hacer un mock de nuestra entidad User, devuelve un usuario cuando se utilice el metodo findOne que es igual al findById
        mockingoose(User).toReturn( user, "findOne");
        
        // realizarr un objeto de nuestro repositorio original, como nuestro repositorio originalmente por awilix detecta una inyección de dependencia
        // que en este caso sería de la entidad User, por ende al crear un objeto de forma manual debemos pasarle la entidad a su constructor      
        // en este caso {User}
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.get(_user._id);

        // el expect recibe la info en un dato con un formato extraño, por esto es que se debe parsear a JSON para JS
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    // TEST: Prueba retornar un usuario por username
    it("Should find a user by username", async () => {
        const _user = { ...user };
        delete _user.password;
        mockingoose(User).toReturn(user, "findOne");
    
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getUserByUsername(_user.username);
    
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
      });

    // TEST: Prueba retornar todos los usuarios
    it("Should return a user collection", async () => {
        users = users.map(user => {
          delete user.password;
          return user;
        });
    
        mockingoose(User).toReturn(users, "find");
    
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
      });

    // TEST: Prueba actualizar un usuario en especifico por id
    it("Should update an especific user by id", async () => {
        const _user = { ...user };
        delete _user.password;
        mockingoose(User).toReturn(_user, "findOneAndUpdate");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.update(user._id, {
          name: "Marluan"
        });

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });
  
    // TEST: Elimina un usuario por su id
    it("Should delete an especific user by id", async () => {
        mockingoose(User).toReturn(user, "findOneAndDelete");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.delete(user._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });

});




// 63 - terminada la configuración del test vamos a configurar un script de tests en el package.json,
//  solo agregando esta linea   "test": "jest" en la seccion scripts
// y probamos el test creado desde la terminal con > npm run test

// 64 - Ya probados los test avanzamos para crear los tests de nuestro servicio, para esto crearemos un nuevo archivo en \unit\services\
// llamado user.services.test.js