const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        console.log('chamou get')
        var key = JSON.parse(JSON.stringify(req.query))
        var key = JSON.parse(JSON.stringify(key))
        console.log(key)
        return res.send(key['hub.challenge'])
    },
    async posttxHooks(req,res){
        console.log(req.body)
        var entry = req.body.entry
        var entry = JSON.parse((JSON.stringify(entry[0])))
        const changes = JSON.parse(JSON.stringify(entry.changes[0]))
        const value = changes.value
        console.log(value)
        const object_id = value.object_id
        console.log(object_id)
    }

}