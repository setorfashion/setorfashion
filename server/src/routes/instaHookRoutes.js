const express = require('express')
const routes = express.Router()
const instaHooks = require('../controllers/instaHooksController')

routes.get('/gethook',instaHooks.gettxHooks)

module.exports = routes 