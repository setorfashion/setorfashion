const { json } = require('express')
const mongoose = require('mongoose')
const Token = mongoose.model('Token')
const {ApolloServer} = require('apollo-server-express')
const { UserInputError } = require("apollo-server-express");
const { get } = require("axios").default;
const { post } = require("request");
const { promisify } = require("util");
require("dotenv").config();
const http = require('http')

const postAsync = promisify(post);


module.exports = {
    async receiveToken_old(req,res){
        const user = req.user
        console.log(user)
        console.log(req)
        const shortToken = req.body.shortToken
        console.log(req.body)
        console.log('linha 19 shortToken: '+shortToken)
        const options ={
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
        }
        var reqst = http.request(options, function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
          });
        });
        reqst.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });
        reqst.end();

        
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
            code: shortToken,
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
        if (statusCode !== 200) {
          let error_message = response.error_message;
          return res.status(402).json({msg:error_message})
        }
       
        const novoToken = new Token({
          authCode,
          shortToken: response.access_token,
          userId: user._id
        })
        const shortToken = response.access_token

        //obter long-live token

        const response = await get("https://graph.instagram.com/access_token", {
          params: {
            grant_type: "ig_exchange_token",
            client_secret: '76eb60ab926342457302b9441cc38ebd',
            access_token: shortToken,
          },
          headers: {
            host: "graph.instagram.com",
          },
        });

        console.log(response)

        //deletar token antigo
        // Token.deleteOne({userId:user._id}).then((rsDelete)=>{

        //   novoToken.save().then((tokensaved)=>{
        //     //inserir novo token
        //       console.log('retorno '+JSON.stringify(tokensaved))
        //       return res.status(201).json(tokensaved)
        //   }).catch (err=>{
        //     console.log('erro do insert'+JSON.stringify(tokensaved))
        //       return res.status(402).json({erro:err})
        //   })

        // }).catch(err=>{
        //   console.log(err)
        // })
        
        
        // return res.status(201).json(response.access_token)
      }

}