const express = require('express')
const routes = express.Router()
const instaHooks = require('../controllers/instaHooksController')

routes.get('/gethook',instaHooks.gettxHooks)
routes.post('/gethook',instaHooks.posttxHooks)

module.exports = routes 