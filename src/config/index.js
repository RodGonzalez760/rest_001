// 2.-después del .env

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    APPLICATION_NAME: process.env.APPLICATION_NAME
}

// 3.- Crearemos un container para la inyección de dependencias, gracias a awilix
    // creamos un archivo en \startup\container.js