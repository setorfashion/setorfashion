const { json } = require('express')

module.exports={
    // 23dffa$##125Poams897
    async gettxHooks(req,res){
        var key = JSON.parse(JSON.stringify(req.query))
        var key = JSON.parse(JSON.stringify(key))
        const verify_token = key['hub.verify_token']
        const challenge = key['hub.challenge']
        return res.send(challenge)
    }

}