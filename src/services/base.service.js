// 30 Clase Base para el CRUD de entidades
class BaseService{
    // recibe un repositorio de tipo user, idea o comment
    constructor(repository){
        this.repository = repository;
    }

    // CRUD

    // Busca la entidad por id
    async get(id){
        // si el id no es enviado, retorna un badRequest, para avisar al usuario que el id no se envió
        // garantiza que el id sea enviado correctamente
        if(!id){
            const error = new Error();
            error.status = 400;
            error.message = "id must be sent";
            throw error;    //envia el error que será capturado por el middleware
        }

        // En caso que el id sea enviado, busca dicha Entidad(user, idea, comment) y le entregamos el id
        const currentEntity = await this.repository.get(id);

        // Si no encuentra(no existe) la Entidad, enviamos el error de no encontrado
        if (!currentEntity) {
            const error = new Error();
            error.status = 404;
            error.message = "Entity does not found";
            throw error;    //envia el error que será capturado por el middleware
        }

        // si encuentra la Entidad entonces la muestra
        return currentEntity;
    }

    // Muestra todas las Entidades
    async getAll(){
        return await this.repository.getAll();
    }

    // CREATE
    async create(entity){
        return await this.repository.create(entity);
    }

    // UPDATE
    async update(id, entity){
        if (!id) {
            const error = new Error;
            error.status = 400;
            error.message = "Id must be sent";
            throw error;
        }

        return await this.repository.update(id, entity);
    }

    // DELETE
    async delete(id){
        if (!id) {
            const error = new Error;
            error.status = 400;
            error.message = "Id must be sent";
            throw error;
        }

        return await this.repository.delete(id);
    }
}

module.exports = BaseService;

// 31 TERMINADO EL PROCESO 30 Para la base de los servicios, pues creamos el resto de los servicios para las entidades(user, idea, comment)