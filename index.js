// AQUI INICIALIZAMOS NUESTRA APP

// 17.-Inyección de dependencias
// llamamos nuestro container
const container = require('./src/startup/container');
//llamamos la clase class Server { desde \startup\index.js, a travéz de nuestro container recién declarado 
const server = container.resolve("app");  // "app" referencia a app: asClass(app).singleton(), en container.js
const { MONGO_URI } = container.resolve("config");

const mongoose = require('mongoose');
mongoose.set("useCreateIndex", true);

mongoose
.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true 
})
.then(() => server.start())
.catch(console.log);


// PASO 17 TERMINADO == EJECUTAMOS LA APP ==
// desde directorio \rest_001\src\
//  > npm run dev

// 18.-Ya probado...haremos un middleware para controlar el error 404