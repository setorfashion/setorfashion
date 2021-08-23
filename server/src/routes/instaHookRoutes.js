const express = require('express')
const routes = express.Router()
const instaHooks = require('../controllers/instaHooksController')

routes.get('/gethook/:key',instaHooks.txHooks)
routes.post('/gethook/:key',instaHooks.txHooks)

module.exports = routes 