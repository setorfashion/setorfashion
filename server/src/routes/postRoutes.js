const express = require('express');
const routes = express.Router();
const postController = require('../controllers/postController');
const requireLogin = require('../middleware/requireLogin'); //irá validar o login do usuario atraves do token Bearer enviado
const multer = require("multer")
const upload = multer({dest:'uploads/'})

routes.post('/createpost',requireLogin,upload.single('image'),postController.createPost);
routes.get('/getallposts', postController.getAllPosts);
routes.get('/getmyposts',requireLogin, postController.getMyPost);
routes.get('/getpostimage/:path/:key',postController.getPostImage);

module.exports = routes;