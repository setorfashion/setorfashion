const { json } = require('express')
const mongoose = require('mongoose')
const Store = mongoose.model('Store')
const subCategoryByStore = mongoose.model('subCategoryByStore')
const Category = mongoose.model("categories")
const subCategory = mongoose.model("subCategory")
const CategoryByStore = mongoose.model('CategoryByStore')
const Setor = mongoose.model ("Setor")

module.exports = {
    async getStoreData(req,res){
        Store.findById(req.body.id)
        .populate("setor")
        .then((store)=>{ 
             CategoryByStore.find({"byStore":store._id}).populate("byCategory")
             .then((rscategories)=>{
                subCategoryByStore.find({"byStore":store._id}).populate("bySubCategory")
                .then((rsSubcategories)=>{
                    let arrayCategories = [];
                    rscategories.map(item=>{
                        arrayCategories.push(item.byCategory._id)
                    })
                    let arraySubCategories = [];
                    rsSubcategories.map(item=>{
                        arraySubCategories.push(item.bySubCategory._id)
                    })
                    return res.status(201).json(
                        { 
                            dados:store,
                            categories: arrayCategories,
                            subcategories: arraySubCategories
                        }
                    )
                }).catch(err=>{
                    console.log(err)
                })
             }).catch(err=>{
                console.log(err)
            })
             
        }).catch(err=>{
            return console.log(err)
        })
    },
    async updateStore(req,res){

        const {storeName,street,number,whatsapp,instagram,email,checkedSubCategories,checkedCategories,store_id,setorId} = req.body
        const setor = await Setor.findById(setorId)

        let newStore = {
            storeName:storeName,
            address:{street,number},
            whatsapp:whatsapp,
            email:email,
            instagram:instagram,
            setor:setorId
        }

        const storeData = await Store.findById(store_id)

        Store.findByIdAndUpdate(store_id,
            {
                storeName:storeName,
                address:{street,number},
                whatsapp:whatsapp,
                email:email,
                instagram:instagram,
                setor:setorId
            },
            {new:true}
        ).then((updatedStore)=>{
            //deletar as categorias e subcategorias e inserir as novas
            CategoryByStore.deleteMany({byStore:store_id}).then((rsDelete)=>{
                checkedCategories.map(item=>{                
                    Category.findById(item)
                    .then((result)=>{
                        let newCategoriesByStore = new CategoryByStore({
                            byStore:storeData,
                            byCategory:result
                        })
                        newCategoriesByStore.save().catch(err=>{
                            console.log(err)
                            return res.status(402).json({err:'Falha ao atualizar os dados, tente novamente mais tarde'})
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                        return res.status(402).json({err:'Falha ao atualizar os dados, tente novamente mais tarde'})
                    })
                })
            }).catch(err=>{
                console.log('erro de deletar categoria')
            })
            subCategoryByStore.deleteMany({byStore:store_id}).then((rsDelete)=>{
                checkedSubCategories.map(item=>{ //cadastrar as categorias selecionadas
                    subCategory.findById(item)
                    .then((result)=>{
                        let newSubCategoriesByStore = new subCategoryByStore({
                            byStore:storeData,
                            bySubCategory:result
                        })
                        newSubCategoriesByStore.save()
                        .catch(err=>{
                            console.log(err)
                            return res.status(402).json({err:'Falha ao atualizar os dados, tente novamente mais tarde'})
                        })
                     }).catch(err=>{
                         console.log(err)
                         return res.status(402).json({err:'Falha ao atualizar os dados, tente novamente mais tarde'})
                     })
                     
                }) 
            }).catch(err=>{
                console.log(err)
                return res.status(402).json({err:'Falha ao atualizar os dados, tente novamente mais tarde'})
            })
            return res.status(201).json({message:'Dados atualizados'})

        }).catch(err=>{
            console.log(err)
        })
    }
}