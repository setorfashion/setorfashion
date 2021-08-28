const mongoose = require('mongoose')
const Store = mongoose.model('Store')
const Post = mongoose.model('Post')
const { get } = require("axios").default;

async function renewPosts(longToken,storeData){
    const responseMediaData = await get("https://graph.instagram.com/me/media", {
                params: {
                    fields:
                        "id,caption,media_url,media_type,permalink,thumbmail_url,timestamp,username",
                    access_token: longToken,
                },
                headers: {
                    host: "graph.instagram.com",
                },
            });
            try {
                
                
                const postsInstagram = responseMediaData['data']['data']   
                Post.deleteMany({postedBy:storeData._id,from:'instagram'})                
                const promises = postsInstagram.map( async (item,key) => {  
                    let childrens = []
                        if(item.media_type==='CAROUSEL_ALBUM'){
                            const childMediaData = await get("https://graph.instagram.com/"+item.id+"/children", {
                                params: {
                                    access_token: longToken,
                                    fields:"id,media_url",
                                    
                                },
                                method: 'get',
                                headers: {
                                    host: "graph.instagram.com",
                                },
                            }).catch(err=>{
                                console.log(`E1: ${err}`)
                                return false
                            });  
                            childrens = childMediaData['data']['data']
                        }           
                        let newPost = new Post({
                            caption: item.caption,
                            id: item.id,
                            postedBy: storeData._id,
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
                        dataFromInstagram:true,
                        lastCheck: new Date()
                        },
                        {new:true}
                    ).then((updatedStore)=>{
                        console.log(`Loja Atualizada : ${updatedStore}`)
                    return true
                }).catch(err=>{
                    console.log('erro update store '+err)
                    return false
                }) 
            } catch (error) {
                console.log('erro try '+error)
                return false
            }
           
            
            
}
module.exports = {
    async verifyInstagramCheckedTime(req,res){
        let daysBefore = new Date()
        let today = new Date()
        daysBefore.setDate(daysBefore.getDate()-4)
        // $gte: daysBefore,$lte: today ----- de ate (between)
        // $lt --- cutoff retorna abaixo dessa data
        Store.find({
            lastCheck:{$lt: daysBefore},
            dataFromInstagram:true            
        })
        .populate('token')
        .then((result)=>{
            result.map((item,index)=>{
                if(item.token){
                    const longToken = item.token.longToken
                    renewPosts(longToken,item)
                }
            })
            return res.send('cron')            
        })

    }
}
