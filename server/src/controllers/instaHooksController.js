const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        var key = JSON.stringify(req.query)
        console.log(key)
        return res.status(201).json({msg:'ok'})
    }

}