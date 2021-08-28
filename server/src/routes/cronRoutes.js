const express = require('express')
const routes = express.Router()
const cron = require('../controllers/cronController')

routes.get('/checklastintagramcheck', cron.verifyInstagramCheckedTime)

module.exports = routes
