// 20.-
module.exports = {
    NotFoundMiddleware: require('./not-found.middleware'),
    ErrorMiddleware: require("./errors.middleware"),
    AuthMiddleware: require("./auth.middleware"),
    ParseIntMiddleware: require("./parse-int.middleware")
}

// 21.- vamos al \routes\index.js para configurar los nuevos middlewares