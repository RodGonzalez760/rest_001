// 18.-
module.exports = (req, res, next) => res.status(404).send({ status: 404, message: "Resource NOT FOUND" });

// 19.- Hecho esto vamos a crear otro middleware para los errores 