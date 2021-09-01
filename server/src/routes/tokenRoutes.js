const express = require('express')
const routes = express.Router()
const tokenController = require("../controllers/tokenController")
const requireLogin = require('../middleware/requireLogin');

routes.post('/',requireLogin,tokenController.receiveToken)
routes.get('/getInstagramData',requireLogin,tokenController.getInstagramData)
routes.get('/checktoken',requireLogin,tokenController.checktoken)
routes.post('/canceltoken',requireLogin,tokenController.cancelToken)

module.exports = routes