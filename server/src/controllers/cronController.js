const mongoose = require('mongoose')
const Store = mongoose.model('Store')
const Post = mongoose.model('Post')
const ClassInstagram = require('../models/instagramModel')
const ClassPost = require('../models/postModel')
const ClassToken = require('../models/tokenModel')
const ClassStore = require('../models/perfilConfig')
const { get } = require("axios").default;

async function renewPosts(longToken, storeData) {
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
    await Post.deleteMany({ postedBy: storeData._id, from: 'instagram' }).then((rs) => {
      console.log(rs)
    })
    const promises = postsInstagram.map(async (item, key) => {
      let childrens = []
      if (item.media_type === 'CAROUSEL_ALBUM') {
        const childMediaData = await get("https://graph.instagram.com/" + item.id + "/children", {
          params: {
            access_token: longToken,
            fields: "id,media_url",

          },
          method: 'get',
          headers: {
            host: "graph.instagram.com",
          },
        }).catch(err => {
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
        childrens: childrens
      })
      await newPost.save()
    })
    await Promise.all(promises);
    Store.findByIdAndUpdate(storeData._id,
      {
        dataFromInstagram: true,
        lastCheck: new Date()
      },
      { new: true }
    ).then((updatedStore) => {
      console.log(`Loja Atualizada : ${updatedStore}`)
      return true
    }).catch(err => {
      console.log('erro update store ' + err)
      return false
    })
  } catch (error) {
    console.log('erro try ' + error)
    return false
  }
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
async function renewP(storeId) {
  const store = new ClassStore({"storeId":storeId})
  await store.getStoreById()
  const post = new ClassPost()
  await post.deletePostsByStoreFromInstagram(store.storeData._id)
  const token = new ClassToken()
  await token.findTokenByStore(store.storeData._id)
  const instagram = new ClassInstagram()
  await instagram.updateStorePosts(null, token.tokenData)
  let promises = []

  instagram.postsInstagram.map((item, key) => {
    promises.push(newPost(item, store.storeData, token.tokenData, instagram, post))
  })
  await Promise.all(promises).then((rs) => {
  }).catch(err => {
    console.log('erro updatestore ' + err)
    reject(err)
  })
  Store.findByIdAndUpdate(store.storeData._id,
    {
      dataFromInstagram: true,
      lastCheck: new Date()
    },
    { new: true }
  ).then((updatedStore) => {
    console.log(`Loja Atualizada : ${updatedStore}`)
    return true
  }).catch(err => {
    console.log('erro update store ' + err)
    return false
  })

}
module.exports = {
  async verifyInstagramCheckedTime(req, res) {
    // const telefone = "(85) 99811-4093"
    // console.log(telefone.match(/\(\d{2}\)\s\d{5}-\d{4}/g))

    // const IP = "10.0.0.1"
    // console.log(IP.match(/^((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(\.)){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])/g))

    //  return res.send('ok')
    let daysBefore = new Date()
    let today = new Date()
    daysBefore.setDate(daysBefore.getDate() - 3)
    // $gte: daysBefore,$lte: today ----- de ate (between)
    // $lt --- cutoff retorna abaixo dessa data
    console.table(daysBefore)
    Store.find({
      lastCheck: { $lt: daysBefore },
      dataFromInstagram: true
    })
      .populate('token')
      .then((result) => {
        console.log(result)
        result.map(async (item, index) => {
          if (item.token) {
            await renewP(item._id)
            // renewPosts(longToken,item)
          }
        })
        return res.send('cron')
      })

  }
}
