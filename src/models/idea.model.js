// PROCESO 23
const mongoose = require('mongoose');
const { Schema } = mongoose;

// aqui conectamos la idea con un autor por medio de author: , también debemos instalar un nuevo complemento llamado mongoose-autopopulate
const IdeaSchema = new Schema({
    idea: { type: String, required:true },
    description: { type: String },
    upvotes: [{ type: Boolean }],
    downvotes: [{ type: Boolean }],
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        autopopulate: true
    },
     // 24 debe crearse el modelo de comments -> models\comment.model.js
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "comment",
            required: true,
            autopopulate: true
        }
    ]
});

// CONFIGURAR EL PLUGIN DE MONGOOSE AUTOPOPULATE
IdeaSchema.plugin(require("mongoose-autopopulate"));


module.exports = mongoose.model("idea", IdeaSchema);


// 24.- Terminada la Creación de los modelos los agregamos al index.js de models