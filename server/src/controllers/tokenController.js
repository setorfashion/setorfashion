const mongoose = require('mongoose')
const Token = mongoose.model('Token')
const Store = mongoose.model('Store')
const Post = mongoose.model('Post')
const { get } = require("axios").default;
const { post } = require("request");
const { promisify } = require("util");
require("dotenv").config();
const https = require('https');


const postAsync = promisify(post);


module.exports = {
    async cancelToken(req,res){
      const user = req.user
      const store_id =req.body.storeId
      Store.find({_id:store_id,createdBy:user._id}).then((store)=>{
        if(store.length>0){
          //excluir todas as publicacoes dos instagram
          Post.deleteMany({postedBy:store_id,from:'instagram'}).then(post=>{
            //excluir o token
            Token.findOneAndDelete({storeId:store_id}).then(token=>{
              //atualizar status do instagram na loja
              Store.findByIdAndUpdate(store_id,
                {
                  dataFromInstagram: false
                },
                {new: true}
                ).then((updatedStore)=>{
                  return res.status(200).json({msg: 'Sua conta do instagram foi desvinculada com sucesso!'})
                }).catch(err=>{
                  console.log(err)
                })
            }).catch(err=>{
              console.log(err)
            })
          }).catch(err=>{
            console.log(err)
          })
        }else{
          return res.status(406).json({msg:'Os dados da sua loja não foram localizados, faça seu login novamente e tente mais uma vez.'})

        }
      }).catch(err=>{
        console.log(err)
      })

    },
    async testeToken(req,res){
      console.log(req.query.code)
      // const tokenData = await Token.findById('6130c9a3be33c13450c5f717')

    },
    async receiveToken(req,res) {
        // sending the request.
        const authCode = req.body.authCode
        const user = req.user
        let { body, statusCode } = await postAsync({
          url: `https://api.instagram.com/oauth/access_token `,
          formData: {
            client_id: 261340495802382,
            client_secret: '76eb60ab926342457302b9441cc38ebd',
            redirect_uri: 'https://sf.fortaldelivery.com.br/token',
            code: authCode,
            grant_type: "authorization_code",
          },
          headers: {
            "content-type": "multipart/form-data",
            host: "api.instagram.com",
          },
        }).catch(err=>{
          console.log('erro da consulta do token '+JSON.stringify(err))
        });

        let response = JSON.parse(body);
        console.log(response)
        if (statusCode !== 200) {
          let error_message = response.error_message;
          return res.status(402).json({msg:error_message})
        }


        const shortToken = response.access_token

        //obter long-live token

        const respLongToken = await get("https://graph.instagram.com/access_token", {
          params: {
            grant_type: "ig_exchange_token",
            client_secret: '76eb60ab926342457302b9441cc38ebd',
            access_token: shortToken,
          },
          headers: {
            host: "graph.instagram.com",
          },
        });
        if(typeof respLongToken['data'] === 'undefined'){
          console.log('erro long token')
        }
        const dadosToken = respLongToken['data']
        const longToken = dadosToken.access_token
        const longToken_live_at = dadosToken.expires_in
        const longtoken_type = dadosToken.token_type

        const storeData = await Store.findOne({createdBy:user._id})

        const novoToken = new Token({
          authCode,
          shortToken: response.access_token,
          longToken,
          longToken_live_at,
          longtoken_type,
          storeId: storeData._id
        })
        //deletar token antigo
          Token.deleteOne({storeId:storeData._id}).then((rsDelete)=>{
            novoToken.save().then((tokensaved)=>{
                //atualizar a referencia do token na loja
                Store.findByIdAndUpdate(storeData._id,{
                  token:tokensaved._id,
                  dataFromInstagram: false,
                  lastCheck: new Date()
                },
                {new:true}
                ).then((storeUpdated)=>{
                  //apagar todas as imagens (caso aja de um vinculo anterior) sincronizadas do instagram
                  console.log(`Loja atualizada no token ${storeUpdated}`)
                  Post.deleteMany({postedBy:storeData._id,from:'instagram'})
                  return res.status(201).json({msg: 'Token atualizado com suceso'})
                }).catch(err=>{
                  console.log(err)
                })
            }).catch (err=>{
              console.log('erro do insert token '+ err)
                return res.status(402).json({erro:err})
            })

          }).catch(err=>{
            console.log(err)
          })
        // return res.status(201).json(response.access_token)
      },

      async getInstagramData(req,res){
        const userId= req.user._id
        const tokenData = await Token.findOne({userId:userId})
        if(tokenData){
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
          // console.log(responseMediaData)
          return res.status(201).json({data:responseMediaData['data']})
        }
        return res.status(201).json({data:''})
      },

      async checktoken(req,res){
        const userId= req.user._id
        const storeData = await Store.findOne({createdBy:userId})
        Token.findOne({storeId:storeData._id}).then((resultToken)=>{
          if(resultToken){
            return res.status(200).json()
          }else{
            return res.status(203).json()
          }

        }).catch(err=>{
          console.log('nao achou valor')
        })
      }

}