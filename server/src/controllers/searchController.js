const mongoose = require('mongoose')
const Store = mongoose.model('Store')
const Post = mongoose.model('Post')
const Category = mongoose.model("categories")
const subCategory = mongoose.model("subCategory")

module.exports = {
    async autoCompletePosts(req,res){
        const infor = req.body.value
        await Post.find(
            {
                "caption": {
                    $regex: '.*' + infor + '.*', $options: 'i'
                }
            })
            .sort({ caption: 1 })
            .then((rs) => {
                return res.status(200).json(rs)
            }).catch(err=>{
                console.log(err)
            })

    },
    async autoCompleteStores(req, res) {
        const infor = req.body.value
        await Store.find(
            {
                "storeName": {
                    $regex: '.*' + infor + '.*', $options: 'i'
                }
            })
            .populate("setor")
            .sort({ storeName: 1 })
            .then((rs) => {
                return res.status(200).json(rs)
            }).catch(err=>{
                console.log(err)
            })
    },
    async autoCompleteStuff(req, res) {
        const infor = req.body.value
        await Post.find(
            {
                "caption": {
                    $regex: '.*' + infor + '.*', $options: 'i'
                }
            })
            .populate({
                path: "postedBy",
                populate: {
                    path: 'setor'
                }
            }).sort({ caption: 1 })
            .then((rs) => {
                return res.status(200).json(rs)
            }).catch(err=>{
                console.log(err)
            })
    },
    async getcategoriesandsubcategories(req,res){
      const categories = await Category.find().sort({description: 1})
      const subCategories = await subCategory.find().sort({description: 1})
      return res.status(200).json([...categories, ...subCategories])
    }
}