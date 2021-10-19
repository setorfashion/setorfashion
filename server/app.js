const express = require('express');
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const axios = require('axios')

if(process.env.NODE_ENV!=='production'){
  require("dotenv").config();
}


const PORT = 5000;
const mongoose = require('mongoose');
const requireDir = require('require-dir');
requireDir('./src/models');
const initializeDB = require('./src/controllers/initializeController')
app.use(express.json());

const CORS_WHITE_LIST= [
  'http://localhost:3000',
  'http://localhost:5000/',
  'https://sf.fortaldelivery.com.br'
]

const corsOptions = {
    origin: function (origin, callback) {
        if(CORS_WHITE_LIST.indexOf(origin)!== -1 || !origin){ //só irá permitir da propria aplicação ou PRESENTE NA WHITELIST
            callback(null,true)
        }else{
          console.log('nao permitido by cors')
            callback(new Error('Not allowed by CORS'))
        }
    }
}



mongoose.connect(process.env.MONGOURI,{ //conexao com o mongodb
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
  console.log('mongo conectado');
  initializeDB.checkDB()

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
app.use('/gn', require('./src/routes/gnPixRoutes'));
app.use('/planos', require('./src/routes/planoRoutes'));

// https://api.instagram.com/v1/users/search?q=buscafeed&client_id=261340495802382
// axios.get('https://www.instagram.com/buscafeed/?__a=1').then((rs)=>{
//   console.log(rs.data)
// // const jsonObj =  rs.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0,-1)
// // const obj = JSON.parse(jsonObj)
// // console.log(obj)
// });

app.listen(PORT);
