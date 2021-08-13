const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const Store = mongoose.model('Store');
const CategoryByStore = mongoose.model('CategoryByStore');
const subCategoryByStore = mongoose.model('subCategoryByStore');
const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../keys');


module.exports = {
    async protected(req,res){
        return res.status(201).json({user:req.user});
    },
    async signin(req, res) {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.json({ error: "Informe todos os campos" });
        } else {
            Usuario.findOne({ email: email}).then((usuario) => {
                if (usuario) {
                    crypt.compare(password,usuario.password).then(doMatch=>{
                        if(doMatch){
                            //enviar token de autorização 
                            const token = jwt.sign({_id: usuario._id},JWT_SECRET);
                            const {_id,name,email} = usuario;                            
                            Store.findOne({"createdBy":_id}).then((resultStore)=>{
                                if(resultStore){
                                    return res.status(201).json(
                                        {
                                            token: token, 
                                            userData:{_id,name,email},
                                            store_id:resultStore._id
                                        })
                                }else{
                                    return res.status(201).json(
                                        {
                                            token: token, 
                                            userData:{_id,name,email},
                                            store_id:''
                                        })
                                }

                            }).catch(err=>{
                                console.log(err);
                            })

                            
                            
                        }else{
                            return res.status(422).json({ error: "Email ou Password inválido!" });
                        }
                    });
                    
                } else {
                    return res.status(422).json({ error: "Email ou Password inválido!" });
                }
            }).catch(err=>{
                console.log(err);
            });

        }
    },
    async signup(req, res) {
        let { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.status(422).json({ error: "Por favor informe todos os campos." });
        } else {
            let email = req.body.email;
            Usuario.findOne({ email: email }).then((result) => {
                if (result) {
                    return res.status(422).json({ error: "Email já cadastrado!" });
                } else {
                    crypt.hash(password, 12).then(newPass => {
                        // return res.send(newPass);
                        req.body.password = newPass;
                        Usuario.create(req.body).then((result) => {
                            if (result) {
                                return res.status(201).json({ success: "Dados Inseridos com sucesso" });
                            }
                        }).catch(err => {
                            return res.status(422).json({ error: "Falha ao inserir os dados", msg: err });
                        });

                    });

                }
            });


        }
    }
}