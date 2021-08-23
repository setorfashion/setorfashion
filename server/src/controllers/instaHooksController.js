const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        var key = req.query.hub
        console.log(key)
        return res.status(201).json(key)
    }

}