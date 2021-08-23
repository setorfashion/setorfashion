const { json } = require('express')

module.exports={
    async txHooks(req,res){
        console.timeLog(req.body)
        return res.status(201).json({msg:'ok'})
    }
}