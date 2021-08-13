const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true       
    },
    postedBy:{
        type: ObjectId, //irá obter o _id do model Usuario
        ref: "Usuario" //faz referencia ao model do Usuario
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

mongoose.model("Post",postSchema);