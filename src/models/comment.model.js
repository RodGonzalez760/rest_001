// 23 modelo comment
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    comment: { type: String, required:true },
    description: { type: String },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        autopopulate: true
    }
});

// CONFIGURAR EL PLUGIN DE MONGOOSE AUTOPOPULATE
// plugins: metodos que dan más poder a mongoose
CommentSchema.plugin(require("mongoose-autopopulate"));




//                               comment = será el nombre utilizado para hacer referencias
module.exports = mongoose.model("comment", CommentSchema);