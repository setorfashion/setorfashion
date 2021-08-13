const mongoose= require('mongoose')

const setorSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    }
})

mongoose.model("Setor",setorSchema)