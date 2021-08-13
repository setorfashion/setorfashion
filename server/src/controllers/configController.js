const mongoose = require("mongoose")
const Category = mongoose.model("categories")
const subCategory = mongoose.model("subCategory")
const Setor = mongoose.model ("Setor")
const Store = mongoose.model ("Store")
const CategoryByStore = mongoose.model ("CategoryByStore")
const subCategoryByStore = mongoose.model ("subCategoryByStore")

module.exports = {
    async createCategory(req,res){        
        Category.create(req.body).then((createdCategory)=>{
            return res.status(201).json(createdCategory);
        })
    },
    async getAllCategories(req,res){
        Category.find().sort({description: 1}).then((resultCategories)=>{
            return res.status(201).json(resultCategories);
        }).catch(err=>{
            console.log(err)
        })
    },
    async createSubCategory(req,res){
        subCategory.create(req.body).then((subCategoryCreated)=>{
            return res.status(201).json(subCategoryCreated)

        }).catch(err=>{
            console.log(err);
        })
    },
    async getAllSubCategories(req,res){
        subCategory.find().sort({description: 1}).then((resultSubCategories)=>{
            return res.status(201).json(resultSubCategories);
        }).catch(err=>{
            console.log(err)
        })
    },
    async createSetor(req,res){
        Setor.create(req.body).then((createdSetor)=>{
            return res.status(201).json(createdSetor)
        }).catch(err=>{
            console.log(err)
        })
    },
    async getAllSetor(req,res){
        Setor.find().then((resultSetor)=>{
            return res.status(201).json(resultSetor)
        }).catch(err=>{
            console.log(err)
        })
    },
    async createStore(req,res){
        const setorId = req.body.setorId
        const setor = await Setor.findById(setorId)
        

        const {storeName,street,number,whatsapp,instagram,email,checkedSubCategories,checkedCategories} = req.body
        

        let newStore = new Store({
            createdBy:req.user,
            storeName,
            address:{street,number},
            whatsapp,
            email,
            instagram,
            setor:setor
        })
        await newStore.save().then((storeSaved)=>{
            // console.log(storeSaved._id)
            
            checkedCategories.map(item=>{ //cadastrar as categorias selecionadas
                
                Category.findById(item)
                .then((result)=>{
                    let newCategoriesByStore = new CategoryByStore({
                        byStore:storeSaved,
                        byCategory:result
                    })
                    newCategoriesByStore.save().catch(err=>{console.log(err)})
                })
                .catch(err=>{console.log(err)})
            })

            
            checkedSubCategories.map(item=>{ //cadastrar as categorias selecionadas
                subCategory.findById(item).then((subcategory)=>{
                    let newSubCategoriesByStore = new subCategoryByStore({
                        byStore:storeSaved,
                        bySubCategory:subcategory
                    })
                    newSubCategoriesByStore.save().catch(err=>{console.log(err)})
                 }).catch(err=>{
                     console.log(err)
                 })
                 
            })            
            res.status(201).json({message:"Sua loja foi configurada com sucesso",store_id:storeSaved._id})
        }).catch(err=>{
            console.log(err)
        })

    }
}

