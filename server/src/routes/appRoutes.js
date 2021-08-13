const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');


routes.get('/',userController.hello);
routes.get('/about', userController.about);

module.exports = routes;