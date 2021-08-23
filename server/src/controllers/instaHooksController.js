const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        var key = JSON.parse(JSON.stringify(req.query))
        var key = JSON.parse(JSON.stringify(key))
        console.log(key)
        // return res.send(challenge)
    },
    async posttxHooks(req,res){
        const entry =req.body.entry
        console.log(req.body)
        console.log(entry)
        // return res.send(challenge)
    }

}