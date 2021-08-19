const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    photo:{
        type: String,
        default: 'no image',
        required: true       
    },
    postedBy:{
        type: ObjectId, //irá obter o _id do model Usuario
        ref: "Store" //faz referencia ao model do Usuario
    },
    from:{
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    id:{
        type: Number
    },
    permalink: {
        type: String
    },
    media_url:{
        type: String
    },
    createdAt:{
        type: Date,        
    }
})

mongoose.model("Post",postSchema);