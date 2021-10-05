const mongoose = require('mongoose');
const GNet  = require('../models/gerenciaNetClass')

require("dotenv").config();

module.exports={
  async gnToken(req,res,next){
    const gNet = new GNet()
    gNet.setBasic()
    req.token = await gNet.basic.post(`/oauth/token`,{"grant_type": "client_credentials"}).then((rs)=>{
      return rs.data?.access_token
    }).catch(err=>{
      console.log(err)
    })
    next()
  }
}