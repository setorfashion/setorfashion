const express = require('express')
const routes = express.Router();
const gnController = require('../controllers/gnController')
const requireToken = require('../middleware/requireToken')

routes.get('/gntoken',requireToken.gnToken,gnController.getGnToken)
routes.get('/gerarcobrancaimpulso',requireToken.gnToken,gnController.gerarCobrancaImpulso)
routes.post('/webhook(/pix)?',gnController.webhook)

module.exports = routes