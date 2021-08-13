const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys.js');
const requireDir = require('require-dir');
app.use(express.json());

requireDir('./src/models'); //informa atraves do require-dir que todos os models estao nesse diratorio, nao precisa ficar dando require em cada model criado


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


//o arquivo app é o index do projeto, portanto qualquer reload na tela ele irá executar esse arquivo e traçar a rota baseado na url

app.use('/', require('./src/routes/appRoutes'));
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/post', require('./src/routes/postRoutes'));
app.use('/config', require('./src/routes/configsRoutes'));
app.use('/store', require('./src/routes/storeRoutes'));



app.listen(PORT);