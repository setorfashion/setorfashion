const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        const key = JSON.stringify(req.query)
        console.log(key)
        return res.status(201).json(key)
    }

}