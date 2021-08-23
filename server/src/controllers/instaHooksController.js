const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        var key = JSON.parse(JSON.stringify(req.query))
        var key = JSON.parse(JSON.stringify(key))
        console.log(key)
        console.log(key['hub.challenge'])
        return res.status(201).json(key)
    }

}