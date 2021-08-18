const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const perfilConfigSchema = new mongoose.Schema({
    createdBy:{
        type: ObjectId,
        ref: "Usuario",
        unique: true
    },
    storeName:{
        type: String,
        required: true
    },
    address:{
        street:{
            type: String,
            required : true
        },
        number: {
            type: Number,
            required: true
        }
    },
    instagram:{
        type: String       
    },
    whatsapp:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    setor:{
        type: ObjectId,
        ref: "Setor"
    },
    dataFromInstagram:{
        type: Boolean,
        default: false
    }
})

mongoose.model("Store",perfilConfigSchema)