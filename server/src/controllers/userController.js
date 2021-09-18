const mongoose = require('mongoose');
const User = mongoose.model('Usuario');
const sha1 = require('sha1');

module.exports = {
    async hello(req,res){
      
        console.log('hellow');
        return res.send('teste hello');
    },
    async about(req,res){
        return res.send('About');
    },

}