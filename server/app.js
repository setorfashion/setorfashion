const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = 5000;
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys.js');
const requireDir = require('require-dir');

app.use(express.json());

requireDir('./src/models'); 


mongoose.connect(MONGOURI,{ //conexao com o mongodb
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('mongo conectado');
});
mongoose.connection.on('error',(err)=>{
    console.log('mongo não conectado', err);
});

app.use('/', require('./src/routes/appRoutes'));
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/post', require('./src/routes/postRoutes'));
app.use('/config', require('./src/routes/configsRoutes'));
app.use('/store', require('./src/routes/storeRoutes'));
app.use('/token', require('./src/routes/tokenRoutes'));
app.use('/token', require('./src/routes/tokenRoutes'));



app.listen(PORT);