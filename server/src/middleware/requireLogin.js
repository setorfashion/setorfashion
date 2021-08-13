const jwt = require('jsonwebtoken');
const {JWT_SECRET} =require('../../keys');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "Você não está logado"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
           return res.status(401).json({error: "Você não está logado"});
        }
        const {_id} = payload;
        Usuario.findById(_id).then(userData=>{
            req.user = userData;
            next(); //caso tudo esteja ok chama o proximo passado da requisição
        });
       
    })

}