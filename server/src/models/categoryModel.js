const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
    }
})

mongoose.model("categories",categorySchema)