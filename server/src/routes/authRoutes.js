const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');
const requireLogin = require('../middleware/requireLogin'); //irá validar o login do usuario atraves do token Bearer enviado

// routes.post('/signup',authController.auth);
routes.post('/signin',authController.signin);
routes.post('/signup',authController.signup);
routes.get('/protected',requireLogin, authController.protected); //chama o requireLogin para validar a sessão pois precisa estar logado para realizar a ação
routes.get('/oauth/:code', authController); //chama o requireLogin para validar a sessão pois precisa estar logado para realizar a ação

module.exports =routes;