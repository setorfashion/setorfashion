const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;

const tokenSchema = new mongoose.Schema({
    authCode:{
        type: String
    },
    shortToken:{
        type: String
    },
    longToken:{
        type: String
    },
    userId:{
        type: ObjectId,
        ref: 'Usuario'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}) 

mongoose.model('Token',tokenSchema);