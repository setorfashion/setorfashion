const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const Store = mongoose.model('Store')
const Token = mongoose.model('Token')
const { uploadFileS3, downloadFileS3 } = require("../../s3")
const { get } = require("axios").default;
const fs = require("fs")

module.exports = {
    async getAllPosts(req, res, next) {
        Post.find().sort({ createdAt: -1 })
            .populate(
                        {path:"postedBy",
                            populate: {
                                path: 'setor' 
                            }
                        }
                    ) //funciona com um join, ira buscar dentro do campo postedby o id e de la buscar os dados selecionado
            .then((result) => {
                if (result) {
                    return res.status(201).json(result);
                }
            }).catch(err => {
                console.log(err);
            });
    },
    async getStorePosts(req, res, next) {
        const storeId = req.body.storeId
        const storeData = await Store.findById(storeId)
        if (!storeData) {
            return res.status(402).json({ message: 'Você precisa criar sua loja antes de vincular sua conta do instagram!' })
        }
        const tokenData = await Token.findOne({ storeId: storeData._id })
        if (!storeData.dataFromInstagram && tokenData) {
            // const responseProfileData = await get("https://graph.instagram.com/me", {
            // params: {
            //     fields: "id,username,media_count,account_type",
            //     access_token:tokenData.longToken
            // },
            // headers: {
            //     host: "graph.instagram.com",
            // },
            // }).catch(err=>{
            //     console.log(err)
            // });
            // const profData = responseProfileData['data']
            
            const responseMediaData = await get("https://graph.instagram.com/me/media", {
                params: {
                    fields:
                        "id,caption,media_url,media_type,permalink,thumbmail_url,timestamp,username",
                    access_token: tokenData.longToken,
                },
                headers: {
                    host: "graph.instagram.com",
                },
            });
            const postsInstagram = responseMediaData['data']['data']
            const promises = postsInstagram.map( async (item,key) => {  
                let childrens = []
                    if(item.media_type==='CAROUSEL_ALBUM'){
                        const childMediaData = await get("https://graph.instagram.com/"+item.id+"/children", {
                            params: {
                                access_token: tokenData.longToken,
                                fields:"id,media_url",
                                
                            },
                            method: 'get',
                            headers: {
                                host: "graph.instagram.com",
                            },
                        }).catch(err=>{
                            console.log(err)
                        });  
                        childrens = childMediaData['data']['data']
                    }           
                    let newPost = new Post({
                        caption: item.caption,
                        id: item.id,
                        postedBy: storeData,
                        media_url: item.media_url,
                        permalink: item.permalink,
                        from: 'instagram',
                        createdAt: item.timestamp,
                        childrens:childrens
                    })                
                await newPost.save()
            })
            await Promise.all(promises);            
            Store.findByIdAndUpdate(storeData._id,
                    {
                    dataFromInstagram:true
                    },
                    {new:true}
                ).then((updatedStore)=>{
                console.log('loja atualizada '+updatedStore)
            }).catch(err=>{
                console.log('erro update store '+err)
            })
            Post.find({ postedBy: storeData._id })
                .sort({ createdAt: -1 })
                .populate("postedBy") //funciona com um join, ira buscar dentro do campo postedby o id e de la buscar os dados selecionado
                .then((result) => {
                    if (result) {
                        return res.status(201).json(result);
                    }
                }).catch(err => {
                    console.log(err);
                })


        } else {
            Post.find({postedBy:storeData._id})
            .sort({createdAt: -1})
            .populate("postedBy") //funciona com um join, ira buscar dentro do campo postedby o id e de la buscar os dados selecionado
            .then((result)=>{
                if(result){
                    return res.status(201).json(result);
                }
            }).catch(err=>{
                console.log(err);
            });
        }

    },

    async createPost(req, res, next) {

        const file = req.file;

        //buscar loja e só permitir criação de post caso aja loja criada

        const storeData = await Store.findOne({ createdBy: req.user._id })
        if (!storeData) {
            return res.status(402).json({ message: 'Você precisa criar sua loja antes de criar postagens!' })
        }

        // realizar upload da imagem para o s3
        const { title, body } = req.body;
        if (!body) {
            fs.unlinkSync(file.path);
            return res.status(422).json({ error: "Informe todos os campos da api" });
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
        newPost.save().then((postCreated) => {
            if (postCreated) {
                fs.unlinkSync(file.path);
                return res.status(201).json(postCreated);
            }
        }).catch(err => {
            fs.unlinkSync(file.path);
            console.log(err);
        });

    },
    async getPostImage(req, res) {
        const readStream = await downloadFileS3(req)
        readStream.pipe(res)
    }

}