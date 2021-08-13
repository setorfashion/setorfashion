const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const subcategoryStore = new mongoose.Schema({
    byStore:{
        type: ObjectId,
        ref: "Store"
    },
    bySubCategory:{
        type: ObjectId,
        ref: "subCategory"
    }

})

mongoose.model('subCategoryByStore',subcategoryStore)