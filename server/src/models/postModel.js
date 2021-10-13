const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
  },
  edited: {
    type: Boolean,
    default: false
  }
})
postSchema.plugin(mongoosePaginate); //habilitando a paginação para esse schema
const PostModel = mongoose.model("Post", postSchema);
class ClassPosts {
  constructor(body) {
    this.body = body
    this.errors = []
    this.posts = []
    this.postInstagramId=''
  }
  async getAllPosts() {
    console.log(this.body)
    const options = {
      page: this.body.page,
      limit: 10,
      sort: { createdAt: -1 },
      populate: {
        path: "postedBy",
        populate: {
          path: 'setor'
        }
      }
    };
    await PostModel.paginate({}, options)
      .then((result) => {
        if (result) {

          this.posts = result
        }
      }).catch(err => {
        this.errors.push(err)
      });
  }
  async updatePost(filter,data){
    await PostModel.findOneAndUpdate(filter,data,{new:true}).then(rs=>{
      // console.log(rs)
    }).catch(err=>{
      this.erros.push(err)
    })
  }
  async editCaption(){
    await PostModel.findOneAndUpdate({postedBy: this.body.storeId,_id:this.body.postId},{
      caption: this.body.captionValue,
      edited: true
    },{new: true}).then((rs)=>{
      console.log(rs)
    })
    .catch(err=>{
      this.errors.push(err)
    })
  }
  async getPostByInstagramId(instagramId){
    await PostModel.findOne({id:instagramId}).then((rs)=>{
      if(!rs){
        this.postInstagramId=''
      }else{
        this.postInstagramId=rs._id
      }
    })
  }
  async getStorePostById(){
    await PostModel.find({postedBy: this.body.storeId,_id:this.body.postId})
    .populate(
      {
        path:'postedBy',
        populate:{
          path:'setor'
        }
      }
    )
    .then((result)=>{
      this.posts=result
    }).catch(err=>{
      this.errors.push(err)
      console.log(err)
    })
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
        this.posts = result

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
