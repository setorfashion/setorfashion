const { json } = require('express')
const mongoose = require('mongoose')
const Token = mongoose.model('Token')
const {ApolloServer} = require('apollo-server-express')
const { UserInputError } = require("apollo-server-express");
const { get } = require("axios").default;
const { post } = require("request");
const { promisify } = require("util");
require("dotenv").config();

const postAsync = promisify(post);


module.exports = {
    // async receiveToken(req,res){
    //     const user = req.user
    //     const shortToken = req.params.shortToken
    //     const insert = {
    //         userId: user._id,
    //         shortToken
    //     }
    //     Token.create(insert).then(createdToken=>{
    //         return res.status(201).json(createdToken)
    //     }).catch(err=>{
    //         return res.status(402).json({msg: JSON.stringify(err)})
    //     })
        
    // },
    async receiveToken(req,res) {
        // sending the request.
        const shortToken = req.body.shortToken
        const user = req.user
        let { body, statusCode } = await postAsync({
          url: `https://api.instagram.com/oauth/access_token `,
          formData: {
            client_id: 261340495802382,
            client_secret: '76eb60ab926342457302b9441cc38ebd',
            redirect_uri: 'https://sf.fortaldelivery.com.br/token',
            code: shortToken,
            grant_type: "authorization_code",
          },
          headers: {
            "content-type": "multipart/form-data",
            host: "api.instagram.com",
          },
        }).catch(err=>{
          console.log('erro da consulta do token'+JSON.stringify(err))
        });
      
        let response = JSON.parse(body);
        console.log('resposta '+JSON.stringify(response))
        console.log('statusCode '+statusCode)
        if (statusCode !== 200) {
          let error_message = response.error_message;
          return res.status(402).json({msg:error_message})
        }
       
        const insert = {
          shortToken,
          longToken: response.access_token,
          userId: user_id
        }
        console.log('inserir no banco '+JSON.stringify(insert))
        Token.save(insert).then((tokensaved)=>{
          console.log('retorno '+JSON.stringify(tokensaved))
            return res.status(201).json(tokensaved)
        }).catch (err=>{
          console.log('erro do insert'+JSON.stringify(tokensaved))
            return res.status(402).json({erro:err})
        })
        // return res.status(201).json(response.access_token)
      }

}