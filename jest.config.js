// 58 Proceso 58 Crear el archivo jest.config.js
// Jest Es una librería desarrollada por Facebook que sirve para realizar tests a nivel de JavaScript, es bastante famosa y fácil de usar.

// Primero exportamos un objeto con la propiedad testEnvironment
module.exports = {
    testEnvironment: "node"
}

// 59 a continuación creamos un directorio nuevo llamado tests, donde incluiremos todos nuestros tests, y dentro de dicho directorio
// crearemos un subdirectorio llamado mocks y otra llamada unit
// mocks = data falsa para probar nuestro codigo
// units = tests unitarios
// a su vez dentro de mocks creamos un archivo index.js y un subdirectorio llamado user, correspondiente a la entidad usuario, y dentro del subdirectorio user creamos el archivo user.model.mock.js