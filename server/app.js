const express = require('express');
const app = express();
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const PORT = 5000;
const mongoose = require('mongoose');
const requireDir = require('require-dir');

app.use(express.json());

const CORS_WHITE_LIST= [
  'http://localhost:3000',
  'http://localhost:5000/',
]

const corsOptions = {
    origin: function (origin, callback) {
      console.log(origin)
      console.log(CORS_WHITE_LIST.indexOf(origin))
        if(CORS_WHITE_LIST.indexOf(origin)!== -1 || !origin){ //só irá permitir da propria aplicação ou PRESENTE NA WHITELIST
            callback(null,true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}

requireDir('./src/models');


mongoose.connect(process.env.MONGOURI,{ //conexao com o mongodb
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('mongo conectado');
});
mongoose.connection.on('error',(err)=>{
    console.log('mongo não conectado', err);
});
app.use(cors(corsOptions)) //bloqueado acesso para quem nao está na white list
app.use(helmet())

app.use('/', require('./src/routes/appRoutes'));
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/post', require('./src/routes/postRoutes'));
app.use('/config', require('./src/routes/configsRoutes'));
app.use('/store', require('./src/routes/storeRoutes'));
app.use('/token', require('./src/routes/tokenRoutes'));
app.use('/hook', require('./src/routes/instaHookRoutes'));
app.use('/cron', require('./src/routes/cronRoutes'));
app.use('/search', require('./src/routes/searchRoutes'));



app.listen(PORT);
