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
    longToken_live_at:{
        type: Number
    },
    longtoken_type:{
        type: String
    },
    storeId:{
        type: ObjectId,
        ref: 'Store',
        unique: true
    },
    countPostHook:{
        type:Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}) 

const tokenModel = mongoose.model('Token',tokenSchema);

class ClassToken{
    constructor(){
        this.errors= []
        this.tokenData = []
    }
    async findTokenByStore(storeId){
        await tokenModel.findOne({ storeId: storeId }).then((result)=>{
            this.tokenData = result
        }).catch(err=>{
            console.log(err)
        })
    }
}

module.exports = ClassToken