// PROCESO 22 - 

const mongoose = require('mongoose');
const { Schema } = mongoose;
// BCRYPT para la encriptación de contraseñas 
const { compareSync, hashSync, genSaltSync } = require('bcrypt');

const UserSchema = new Schema({
    name:       { type: String, required: true },
    username:   { type: String, require: true },
    password:   { type: String, required: true }
});

// Metodo para mongoose, toJSON se usa y llama cada vez q se devuelva un objeto(lectura de un documento) de tipo USER se elimina el pass para que el cliente no lo vea  
UserSchema.methods.toJSON = function(){
    // convierte el doc. de mongo en objeto de JS normal
    let user = this.toObject();
    delete user.password;
    return user;
};


// Metodo para comparar las contraseñas encriptadas,todos los docs de mongo tendran esta funcion, en este caso this corresponde al doc que se está manipulando.
UserSchema.methods.comparePassword = function(password){
    return compareSync(password, this.password);
};

// Metodos para la encriptación
// debe ser una funcion tradicional para no perder el scope de mongoose, donde this se refiere al usuario que se está guardando
UserSchema.pre('save', async function(next){
    const user = this;

    // si no se está modificando seguimos, si se está modificando vamos al salt
    if (!user.isModified("password")) {
        return next();    
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();

})

module.exports = mongoose.model('user', UserSchema);

// 23 - TERMINADO EL PROCESO 22 - seguimos creando el modelo, en este caso un nuevo archivo idea.model.js el cual tiene basicamente el mismo codigo de este archivo