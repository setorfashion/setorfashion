const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        var key = JSON.parse(JSON.stringify(req.query))
        console.log(key)
        console.log(key['challenge'])
        return res.status(201).json(key)
    }

}