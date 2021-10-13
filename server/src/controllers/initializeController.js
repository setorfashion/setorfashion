const mongoose = require('mongoose');
const ClassLevel = require('../models/levelModel')
const ClassPlano = require('../models/planosModel')

module.exports = {
  async checkDB(req,res){
    const level = new ClassLevel({})
    const plano = new ClassPlano({})
    await level.getAllLevels()
    await plano.getAllPlanos()
    if(level.levels.length===0)
      level.initizalizeLevelDB()
    if(plano.planos.length===0)
      plano.initializePlanosDB()
    
  }
}