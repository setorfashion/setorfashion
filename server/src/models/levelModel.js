const mongoose = require('mongoose')

const levelSchema = new mongoose.Schema({
  description:{
    type: String,
    required: true
  },
  level:{
    type: Number,
    required: true
  }
})
const levelModel = mongoose.model("Level", levelSchema)

class ClassLevel {
  constructor(body){
    this.body = body
    this.levels= []
    this.predefined = [
      {
        description: 'USER',
        level: 4
      },{
        description: 'STORE',
        level: 3
      },{
        description: 'ADMIN',
        level: 0
      }
  ]
  }
  async getAllLevels(){
    await levelModel.find().then((rs)=>{
      this.levels = rs
    })
  }
  async getLevelsByFilter(filter){
    await levelModel.find(filter).then((rs)=>{
      this.levels = rs
    }).catch(err=>{
      console.log(err)
    })
  }
  initizalizeLevelDB(){
    levelModel.create(this.predefined).catch(err=>{
      console.log(err)
    })
  }
  async getGeneralLevel(){
    await levelModel.find({description: 'General'}).then((rs)=>{
      this.generalId = rs._id
    })
  }
}
module.exports = ClassLevel