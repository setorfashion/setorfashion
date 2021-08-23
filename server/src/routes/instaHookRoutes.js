const express = require('express')
const routes = express.Router()
const instaHooks = require('../controllers/instaHooksController')

routes.get('/gethook/:key',instaHooks.gettxHooks)
routes.post('/gethook/:key',instaHooks.posttxHooks)

module.exports = routes 