const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        const key = req.params.key
        console.timeLog('get '+key)
        return res.status(201).json(key)
    },
    async posttxHooks(req,res){
        const key = req.params.key
        console.timeLog('post '+key)
        return res.status(201).json(key)
    },

}