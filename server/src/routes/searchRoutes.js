const express = require('express')
const routes = express.Router()
const searchController = require('../controllers/searchController')

routes.post('/autocompletestores',searchController.autoCompleteStores)
routes.post('/autocompleteposts',searchController.autoCompletePosts)

module.exports =routes