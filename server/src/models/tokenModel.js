const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    token:{
        type: String
    }
}) 

mongoose.model('Token',tokenSchema);