const express = require('express')
const routes = express.Router()
const searchController = require('../controllers/searchController')

routes.post('/autocompletestores',searchController.autoCompleteStores)
routes.post('/autocompleteposts',searchController.autoCompletePosts)
routes.post('/autocompletestuff',searchController.autoCompleteStuff)

module.exports =routes