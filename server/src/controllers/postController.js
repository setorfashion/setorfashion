const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const Store = mongoose.model('Store')
const Token = mongoose.model('Token')
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
    async getStorePosts(req,res,next){
        const storeId= req.body.storeId
        const storeData = await Store.findById(storeId)
        if(!storeData){
            return res.status(402).json({message: 'Você precisa criar sua loja antes de vincular sua conta do instagram!'})
        }
        const tokenData = await Token.findOne({storeId:storeData._id})
        if(!storeData.dataFromInstagram && tokenData){
            console.log(tokenData.longToken)
            const responseProfileData = await get("https://graph.instagram.com/me", {
            params: {
                fields: "id,username,media_count,account_type",
                access_token:tokenData.longToken,
            },
            headers: {
                host: "graph.instagram.com",
            },
            });
            console.log(responseProfileData)

            const responseMediaData = await get("https://graph.instagram.com/me/media", {
            params: {
                fields:
                "id,caption,media_url,media_type,permalink,thumbnail_url,timestamp,username",
                access_token:tokenData.longToken,
            },
            headers: {
                host: "graph.instagram.com",
            },
            });
            const postsInstagram = responseMediaData['data']
            postsInstagram.map(item=>{
                let newPost = new Post({
                    caption: item.caption,
                    id: item.id,
                    postedBy: storeData,
                    media_url:item.media_url,
                    photo: '',
                    permalink: item.permalink,
                    from: 'instagram',
                    createdAt: item.timestamp
                })
                newPost.save()
            })
        }
        // return res.status(201).json(responseMediaData['data'])
        Post.find({postedBy:storeData._id})
        .sort({createdAt: -1})
        .populate("postedBy","_id, name") //funciona com um join, ira buscar dentro do campo postedby o id e de la buscar os dados selecionado
        .then((result)=>{
            if(result){
                // console.log(result)
                return res.status(201).json(result);
            }
        }).catch(err=>{
            console.log(err);
        });
    },

    async createPost(req,res,next){

        const file = req.file;

        //buscar loja e só permitir criação de post caso aja loja criada

        const storeData = await Store.findOne({createdBy:req.user._id})
        if(!storeData){
            return res.status(402).json({message: 'Você precisa criar sua loja antes de criar postagens!'})
        }

        // realizar upload da imagem para o s3
        const {title,body} =req.body;
        if(!body){
            fs.unlinkSync(file.path);
            return res.status(422).json({error: "Informe todos os campos da api"});
        } 

        const rsUpload = await uploadFileS3(file)
             
        req.user.password = undefined; 
        let newPost = new Post({
            title,
            caption: body,
            postedBy: storeData,
            photo: rsUpload.Key,
            from: 'local',
            createdAt: Date.now()
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