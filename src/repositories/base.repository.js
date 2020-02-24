// PROCESO 26 - Base o plantilla para un CRUD cuya responsabilidad va a ser heredada por otros repositorios

class baseRepository {
    // Constructor que recibe el modelo de mongoDB con el que va a interactuar
    constructor(model){
        this.model = model;        
    }

    // función asyncrona que obtendra un documento de mongo por medio de su id
    async get(id){
        return await this.model.findById(id);
    }

    async geyAll(){
        return await this.model.find;        
    }

    async create(entity){
        return await this.model.create(entity);
    }    

    async update(id, entity){
        return await this.model.findByIdAndUpdate(id, entity, {new: true}) //{new:true}retorna la entidad que ha sido actualizada con los campos
    }

    async delete(id){
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = baseRepository;

// 27 - Terminado el este proceso 26 continuamos creando los otros repositorios necesarios en este caso (user)