const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const Store = mongoose.model('Store')
const ClassPost = require('../models/postModel')
const ClassStore = require('../models/perfilConfig')
const ClassToken = require('../models/tokenModel')
const ClassInstagram = require('../models/instagramModel')
const { uploadFileS3, downloadFileS3 } = require("../../s3")
const { get } = require("axios").default;
const fs = require("fs");

function getPostsFromInstagram(longToken) {
    return new Promise((resolve, reject) => {
        try {
            const rst = get("https://graph.instagram.com/me/media", {
                params: {
                    fields:
                        "id,caption,media_url,media_type,permalink,thumbmail_url,timestamp,username",
                    access_token: longToken
                },
                headers: {
                    host: "graph.instagram.com",
                },
            });
            resolve(rst)
        } catch (error) {
            reject(error)
            return
        }
    })
}
function getPostsNextPageFromInstagram(url) {
    return new Promise((resolve, reject) => {
        try {
            const rst = get(url);
            resolve(rst)
        } catch (error) {
            reject(error)
            return
        }
    })
}

function checkChildrens(tokenData, id) {
    return new Promise((resolve, reject) => {
        get("https://graph.instagram.com/" + id + "/children", {
            params: {
                access_token: tokenData.longToken,
                fields: "id,media_url",
            },
            method: 'get',
            headers: {
                host: "graph.instagram.com",
            },
        }).then((rs) => {
            resolve(rs['data']['data'])
        }).catch(err => {
            reject(err)
            return
        });

    })
}

function newPost(item, storeData, tokenData,instagram,post) {
    return new Promise(async (resolve, reject) => {
        let childrens = []
        if (item.media_type === 'CAROUSEL_ALBUM') {
            const nc = [
                instagram.checkChildrens(tokenData, item.id)
            ]
            await Promise.all(nc).then((rs) => {
                childrens = rs[0]
            })
        }
        let newPost = new Post({
            caption: item.caption,
            id: item.id,
            postedBy: storeData,
            media_url: item.media_url,
            permalink: item.permalink,
            from: 'instagram',
            createdAt: item.timestamp,
            childrens: childrens
        })
        await post.createPost(newPost).then(rs=>{
            resolve(true)
        }).catch(err=>{
            reject(err)
        })

    })
}

module.exports = {

    async getAllPosts(req, res) {
        const posts = new ClassPost(req.params)
        await posts.getAllPosts()
        if(posts.errors.length>0) return res.status(402).json({msg:posts.errors})
        return res.status(200).json(posts.posts)
    },
    async getStorePostBypostId(req,res){
      const posts = new ClassPost(req.body)
      await posts.getStorePostById()
      if(posts.errors.length>0){
        return res.status(404).json({msg:posts.errors})
    }
      return res.status(200).json({posts: posts.posts})
    },

    async editPost(req,res){
      const posts = new ClassPost(req.body)
      await posts.editCaption()
      if(posts.errors.length>0){
        return res.status(401).json({msg:"Erro ao atualizar a postagem"})
      }
      return res.status(200).json({msg:"ok"})

    },

    async getStorePosts(req, res) {
        const store = new ClassStore(req.body)
        await store.getStoreById()
        if (store.storeData.length===0) {
            return res.status(402).json({ message: 'Você precisa criar sua loja antes de vincular sua conta do instagram!' })
        }

        const token = new ClassToken()
        await token.findTokenByStore(store.storeData._id)

        const post = new ClassPost()

        if (!store.storeData.dataFromInstagram && token.tokenData) {
            const instagram = new ClassInstagram()
            await instagram.updateStorePosts(store.storeData, token.tokenData)
            // console.log(`qtd de posts instagram ${instagram.postsInstagram.length}`)
            if(instagram.postsInstagram.length>0) post.deletePostsByStoreFromInstagram(store.storeData._id)

            let promises = []
            instagram.postsInstagram.map((item, key) => {
                promises.push(newPost(item, store.storeData, token.tokenData, instagram,post))
            })
            await Promise.all(promises).then((rs) => {
            }).catch(err => {
                console.log('erro updatestore ' + err)
                reject(err)
            })
            await store.updateStore({dataFromInstagram: true})
        }
        await post.getStorePosts(store.storeData._id)
        if(post.errors.length>0){
            return res.status(401).json({msg:post.errors})
        }
        return res.status(200).json(post.posts)
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
