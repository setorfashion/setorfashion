const express = require("express")
const routes = express.Router()
const storeControle = require("../controllers/storeController")
const requireLogin = require('../middleware/requireLogin'); //irá validar o login do usuario atraves do token Bearer enviado

routes.post('/getstorebyid',storeControle.getStoreData)
routes.put('/updatestore',requireLogin,storeControle.updateStore)
routes.post('/createstore',requireLogin,storeControle.createStore)

module.exports = routes