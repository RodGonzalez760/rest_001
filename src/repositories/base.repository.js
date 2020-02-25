// PROCESO 26 - Base o plantilla para un CRUD cuya responsabilidad va a ser heredada por otros repositorios

class BaseRepository {
    // Constructor que recibe el modelo de mongoDB con el que va a interactuar
    constructor(model){
        this.model = model;        
    }

    // función asyncrona que obtendra un documento de mongo por medio de su id
    async get(id){
        return await this.model.findById(id);
    }

    // 48 modificaciones para la paginación, agregamos PageSize y PageNum
    // donde PageSize nos va a limitar la cantidad de recursos que vamos a traer desde mongoDB
    // y     PageNum será la página que queremos ver
    async getAll(pageSize = 5,  pageNum = 1){
        // 48 mongoose tiene metodos que nos facilitarán la paginación skip y limit
        // donde skip le dice a mongoose cuantos elementos debe saltar para comenzar a buscar
        // y limit limita la cantidad de elementos que debe retornar
        // Entonces ahora determinamos los skips
        const skips = pageSize * (pageNum - 1); 
        return await this.model
            .find()
            .skip(skips)
            .limit(pageSize); 
    }

    async create(entity){
        return await this.model.create(entity);
    }    

    async update(id, entity){
        return await this.model.findByIdAndUpdate(id, entity, {new: true}); //{new:true}retorna la entidad que ha sido actualizada con los campos        
    }

    async delete(id){
        await this.model.findByIdAndDelete(id);
        return true;
    }
}

module.exports = BaseRepository;

// 27 - Terminado el este proceso 26 continuamos creando los otros repositorios necesarios en este caso (user)

// 49 terminado el paso 48 vamos al base.service.js ya que ahí tenemos el metodo getAll() donde debe recibir el pageSize y pageNum