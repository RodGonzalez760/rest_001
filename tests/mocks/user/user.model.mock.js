// 59 Creamos data en el archivo user.model.mock.js donde lo exportamos como un objeto con la propiedad user y users 
module.exports = {
    user: {
      _id: "507f191e810c19729de860ea",
      name: "Marluan",
      username: "Marluan03",
      password: "mystrongPassword"
    },
    users: [
      {
        _id: "507f191e810c19729de860ea",
        name: "Marluan",
        username: "Marluan03",
        password: "mystrongPassword"
      },
      {
        _id: "507f191e810c19729de860eb",
        name: "Erick",
        username: "Erick_34",
        password: "mystrongPassword"
      }
    ]
  };
  
//   60 hecho esto creamos un mock de nuestro repositorio en esta misma ruta user.repository.mock.js