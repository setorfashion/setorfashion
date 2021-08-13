const express = require('express')
const routes = express.Router()
const configController = require('../controllers/configController')
const requireLogin = require('../middleware/requireLogin')

routes.post('/createcategory',configController.createCategory)
routes.get('/getallcategories',requireLogin,configController.getAllCategories)
routes.post('/createsubcategory',configController.createSubCategory)
routes.get('/getallsubcategories',requireLogin,configController.getAllSubCategories)
routes.post('/createsetor',configController.createSetor)
routes.get('/getallsetor',requireLogin,configController.getAllSetor)
routes.post('/createstore',requireLogin,configController.createStore)
// routes.get('/getstore',requireLogin,configController.getAllSetor)
// routes.put('/updatestore',requireLogin,configController.getAllSetor)

module.exports = routes