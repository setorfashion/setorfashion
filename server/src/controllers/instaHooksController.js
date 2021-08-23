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
        var entry = JSON.parse(req.body.entry)
        console.log(req.body)
        console.log(entry)
        var entry = JSON.parse((JSON.stringify(entry[0])))
        console.log(entry)
        console.log(entry.changes)

    }

}