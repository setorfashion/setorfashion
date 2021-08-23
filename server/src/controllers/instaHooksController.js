const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        const key = req.query
        console.log('get '+key)
        return res.status(201).json(key)
    },
    async posttxHooks(req,res){
        const key = req.query
        console.log('post '+key)
        return res.status(201).json(key)
    },

}