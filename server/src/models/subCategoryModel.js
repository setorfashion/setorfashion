const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const subCategorySchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
    }
})

mongoose.model("subCategory",subCategorySchema)