// 19.-Errores
module.exports = (req, res, next) => {
    // captura el status informado en el error
    const httpStatus = err.status || 500;

    // muestra el status del error y el mensaje informado en el error
    return res.status(httpStatus).send({
        status: httpStatus,
        message: err.message || "Internal server error"
    });
};

// 20.-vamos al index.js de middlewares