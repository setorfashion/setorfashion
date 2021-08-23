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
        var entry =req.body.entry
        console.log(req.body)
        var entry = JSON.parse(JSON.stringify(entry))
        var entry = JSON.parse(JSON.stringify(entry))
        console.log( JSON.parse(JSON.stringify(entry.changes)))
    }

}