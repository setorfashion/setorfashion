const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    photo: {
        type: String,
        default: 'no image',
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "Store"
    },
    from: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    id: {
        type: Number
    },
    permalink: {
        type: String
    },
    media_url: {
        type: String
    },
    createdAt: {
        type: Date,
    },
    media_type: {
        type: String
    },
    childrens: {
        type: Array
    }
})

const PostModel = mongoose.model("Post", postSchema);

class ClassPosts {
    constructor(body) {
        this.body = body
        this.errors = []
        this.posts = []
    }
    async getAllPosts() {
        await PostModel.find().sort({ createdAt: -1 })
            .populate(
                {
                    path: "postedBy",
                    populate: {
                        path: 'setor'
                    }
                }
            ) //funciona com um join, ira buscar dentro do campo postedby o id e de la buscar os dados selecionado
            .then((result) => {
                if (result) {
                    this.posts = result
                }
            }).catch(err => {
                this.errors.push(err)
            });
    }
    async getStorePosts(id) {
        await PostModel.find({ postedBy: id })
            .sort({ createdAt: -1 })
            .populate({
                path: "postedBy",
                populate: {
                    path: 'setor'
                }
            }) //funciona com um join, ira buscar dentro do campo postedby o id e de la buscar os dados selecionado
            .then((result) => {
                this.posts=result

            }).catch(err => {
                this.errors.push(err)
                console.log(err);
            });
    }
    async deletePostsByStoreFromInstagram(storeId) {
        await PostModel.deleteMany({ postedBy: storeId, from: 'instagram' })
    }
    async createPost(data) {
        await data.save()
            .then((rs) => {
                return true
            }).catch(err => {
                
                return false
            })
    }


}
module.exports = ClassPosts
