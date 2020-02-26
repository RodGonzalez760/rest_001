// 61 exportamos todos los mocks que tengamos
module.exports = {
    userModelMock: require('./user/user.model.mock'),
    UserRepositoryMock: require('./user/user.repository.mock')

}

// 62 ahora pasamos al directorio \tests\unit\
// donde creamos 2 subdirectorios services y repositories, ya que son las entidades que vamos a testear
// y comenzamos por nuestro repositorio creando el archivo user.repository.test.js