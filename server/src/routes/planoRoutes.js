const express = require('express')
const routes = express.Router()

const requireAdmin = require('../middleware/requireAdmin')

module.exports = routes