const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const {uploadFileS3, downloadFileS3} = require("../../s3")
const fs = require("fs")

module.exports = {
    async getAllPosts(req,res,next){
        Post.find().sort({createdAt: -1})
        .populate("postedBy","_id, name") //funciona com um join, ira buscar dentro do campo postedby o id e de la buscar os dados selecionado
        .then((result)=>{
            if(result){
                return res.status(201).json(result);
            }
        }).catch(err=>{
            console.log(err);
        });
    },
    async getMyPost(req,res,next){
        const userId = req.user._id; //anexado ao request na validação do login  
        Post.find({postedBy:userId})
        .sort({createdAt: -1})
        .populate("postedBy","_id, name") //funciona com um join, ira buscar dentro do campo postedby o id e de la buscar os dados selecionado
        .then((result)=>{
            if(result){
                return res.status(201).json({teste:'teste'});
            }
        }).catch(err=>{
            console.log(err);
        });
    },

    async createPost(req,res,next){
        const file = req.file;
        // realizar upload da imagem para o s3
        const {title,body} =req.body;
        if(!title || !body ){
            fs.unlinkSync(file.path);
            return res.status(422).json({error: "Informe todos os campos da api"});
        } 

        const rsUpload = await uploadFileS3(file)
             
        req.user.password = undefined; 
        let newPost = new Post({
            title,
            body,
            postedBy: req.user,
            photo: rsUpload.Key
        });
        newPost.save().then((postCreated)=>{
            if(postCreated){
                fs.unlinkSync(file.path);
                return res.status(201).json(postCreated);
            }
        }).catch (err=>{
            fs.unlinkSync(file.path);
            console.log(err);
        });

    },
    async getPostImage(req,res){
        const readStream = await downloadFileS3(req)
        readStream.pipe(res)
    }

}