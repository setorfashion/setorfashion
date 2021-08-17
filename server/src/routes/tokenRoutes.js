const express = require('express')
const routes = express.Router()
const tokenController = require("../controllers/tokenController")
const requireLogin = require('../middleware/requireLogin');

routes.post('/',requireLogin,tokenController.receiveToken)
routes.get('/getInstagramData',requireLogin,tokenController.getInstagramData)

module.exports = routes