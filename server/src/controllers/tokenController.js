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
        const shortToken = req.params.shortToken
        let { body, statusCode } = await postAsync({
          url: `https://api.instagram.com/oauth/access_token `,
          formData: {
            client_id: 261340495802382,
            client_secret: '037970e3ad9ba0d26dac202d2fd366e1',
            redirect_uri: 'https://sf.fortaldelivery.com.br/token',
            code: shortToken,
            grant_type: "authorization_code",
          },
          headers: {
            "content-type": "multipart/form-data",
            host: "api.instagram.com",
          },
        });
      
        let response = JSON.parse(body);
      
        if (statusCode !== 200) {
          let error_message = response.error_message;
          return res.statusCode(402).json({msg:error_message})
        }
      
        return res.statusCode(200).json({msg :JSON.stringify(response)})
      }

}