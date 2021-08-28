const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = {
    async verifyInstagramCheckedTime(req,res){
        let daysBefore = new Date()
        let today = new Date()
        daysBefore.setDate(daysBefore.getDate()-5)
        
        Store.find({
            lastCheck:{$gte: daysBefore,$lte: today},
            dataFromInstagram:true            
        })
        .populate('token')
        .then((result)=>{
            console.log('resultado')
            console.log(result)
            return res.send(result)
        })

    }
}
