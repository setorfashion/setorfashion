const mongoose = require('mongoose');
const GNet  = require('../models/gerenciaNetClass')
require("dotenv").config();

module.exports={
  async getGnToken(req,res){
    res.send(req.token)
  },
  async webhook(req,res){
    console.log(req.body)
    return res.send('ok')
  },
  async gerarCobrancaImpulso(req,res){
    // const {valor,qtd} = req.body
    const access_token = req.token
    const gNet = new GNet(access_token)
    gNet.setBearer()
    const cobranca = {
      calendario: {
        "expiracao": 30000 //30min
      },
      valor: {
        "original": '1.00'
      },
      chave: `${process.env.CHAVE_PIX}`,
      solicitacaoPagador: `Pagamento impulsionamento postagem 5 dia(s)`
    }
    const QRid =  await gNet.bearer.post(`/v2/cob`,cobranca).then((rs)=>{
      console.log(rs.data)
      return rs.data.loc.id
    }).catch(err=>{console.log(err)}) //gerar Cobrança
    const qrData = await gNet.bearer.get(`/v2/loc/${QRid}/qrcode`).then(rs=> {return rs.data}) //obter imagem QRCode
    return res.status(200).json({qr:qrData})
  }

}