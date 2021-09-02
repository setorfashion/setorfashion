const express = require('express')
const routes = express.Router()
const searchController = require('../controllers/searchController')

routes.post('/autocomplete',searchController.autocomplete)

module.exports =routes