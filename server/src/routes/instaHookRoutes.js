const express = require('express')
const routes = express.Router()
const instaHooks = require('../controllers/instaHooksController')

routes.get('/gethook',instaHooks.txHooks)
routes.post('/gethook',instaHooks.txHooks)

module.exports = routes 