const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const planoSchema = new mongoose.Schema({
  description:{
    type: String,
    required: true
  },
  value:{
    type: Number,
    required: true
  },
  lifeTimeDays:{
    type: Number,
    required: true
  },
  active:{
    type: Boolean,
    required:true,
    default: true
  },
  comercializable:{
    type: Boolean,
    required:true,
    default: false
  },
  experieDate:{
    type: Date,
    required: false,
  }
})

const planoModel = mongoose.model('Plano', planoSchema)

class ClassPlano{
  constructor(body){
    this.body = body
    this.planos = []
    this.predefined = [
      {
        description: 'Avaliacao',
        value: 0,
        lifeTimeDays: 3,
        comercializable: false
      },{
        description: 'Homologacao',
        value: 0,
        lifeTimeDays: 3,
        comercializable: false,
        experieDate: '2021-12-31 23:59:59'
      },{
        description: 'Mensal',
        value: 50.00,
        lifeTimeDays: 30,
        comercializable: true
      },{
        description: 'Trimestral',
        value: 120.00,
        lifeTimeDays: 90,
        comercializable: true
      }
    ]
  }
  async getAllPlanos (){
    planoModel.find().then((rs)=>{
      this.planos = rs
    }).catch(err=>{
      console.log(err)
    })
  }
  async getPlanoByFilter(filter){
    planoModel.find(filter).then((rs)=>{
      this.planos = rs
    })
  }
  async initializePlanosDB(){
    await planoModel.create(this.predefined).catch(err=>{
      console.log(err)
    })
  }
  setNewPlano(){
    const newPlano = new planoModel(this.body)
    console.log(newPlano)
  }
}

module.exports = ClassPlano