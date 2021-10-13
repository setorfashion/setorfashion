const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength: 2
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
      type: ObjectId,
      ref: "Level",
      required: true
    }
});

class ClassUsuario {
    constructor(body){
        this.body=body
        this.errors = []
    }
    checkBodyData(){
        if (!this.body.email || !this.body.password) {
            this.errors.push("Informe todos os campos");
        }
    }

}
module.exports = ClassUsuario
mongoose.model('Usuario',UserSchema);