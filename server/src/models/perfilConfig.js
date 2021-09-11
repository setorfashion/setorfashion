const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const storeSchema = new mongoose.Schema({
    createdBy: {
        type: ObjectId,
        ref: "Usuario",
        unique: true
    },
    token: {
        type: ObjectId,
        ref: "Token"
    },
    storeName: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        }
    },
    instagram: {
        type: String
    },
    whatsapp: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    setor: {
        type: ObjectId,
        ref: "Setor"
    },
    dataFromInstagram: {
        type: Boolean,
        default: false
    },
    storePicture: {
        type: String,
        default: 'no-image'
    },
    status_activity: {
        type: Boolean,
        default: false
    },
    lastCheck: {
        type: Date,
        default: Date.now
    }
})

const storeModel = mongoose.model("Store", storeSchema)

class ClassStore {
    constructor(body) {
        this.body = body
        this.errors = []
        this.storeData = ''
    }
    async getStoreById() {
        await storeModel.findById(this.body.storeId).then((result) => {
            this.storeData = result
        }).catch(err => {
            this.errors.push(err)
            console.log(err)
        })
    }
    async updateStore(data) {
        console.log(data)
        console.log(this.body)
        storeModel.findByIdAndUpdate(this.body.storeId,
            data,
            { new: true }
        ).then((updatedStore) => {
            console.log('loja atualizada ')
            return true
        }).catch(err => {
            console.log('erro update store ' + err)
            return err
        })
    }
}
module.exports = ClassStore