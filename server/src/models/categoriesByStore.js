const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const categorystore = new mongoose.Schema({
    byStore:{
        type: ObjectId,
        ref: "Store"
    },
    byCategory:{
        type: ObjectId,
        ref: "categories"
    }

})

mongoose.model('CategoryByStore',categorystore)