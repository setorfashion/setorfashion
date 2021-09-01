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
        type: ObjectId,
        ref: "Store" 
    },
    from:{
        type: String,
        required: true
    },
    caption: {
        type: String
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
    },
    media_type:{
        type: String
    },
    childrens:{
        type: Array
    }
})

mongoose.model("Post",postSchema);