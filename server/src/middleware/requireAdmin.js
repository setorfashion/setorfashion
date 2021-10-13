const jwt = require('jsonwebtoken');
require("dotenv").config();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "Você não está logado"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
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