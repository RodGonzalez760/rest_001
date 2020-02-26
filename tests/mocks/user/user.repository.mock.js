// 60 crear el user.repository.mock.js
// donde haremos un mock de todas las funciones que tiene nuestro repositorio de usuario
// estas funciones deben ser las mismas que las funciones creadas en el Controller(user.controller.js) de user y en el repository de user(user.repository.js)
module.exports = {
    get: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getUserByUsername: jest.fn()
}

// 61 terminado el paso 60 vamos al index.js de \test\mocks\ 