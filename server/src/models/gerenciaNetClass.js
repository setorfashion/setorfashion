const axios = require('axios')
const fs = require('fs')
const path = require('path')
const https = require('https')

class GNet{
  constructor(token){
    this.token = token
  }
  setBearer(){
    const access_token = this.token
    const cert = fs.readFileSync(
      path.resolve(__dirname,`../certificados/${process.env.GN_CERT_HOMOL}`)
    )
    const agent = new https.Agent({
      pfx: cert,
      passphrase: ''
    })
    this.bearer = axios.create({
      baseURL: process.env.GN_ENDPOINT_HOMOL,
      httpsAgent: agent,
      headers:{
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    })
  }
  setBasic(){
    const cert = fs.readFileSync(
      path.resolve(__dirname,`../certificados/${process.env.GN_CERT_HOMOL}`)
    )
    const agent = new https.Agent({
      pfx: cert,
      passphrase: ''
    })
    const credentials = Buffer.from(`${process.env.GN_CLIENTE_ID_HOMOL}:${process.env.GN_SECRET_ID_HOMOL}`).toString('base64') //convert em base64

    this.basic = axios.create({
      baseURL: process.env.GN_ENDPOINT_HOMOL,
      headers:{
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      httpsAgent: agent,

    })
  }
}
module.exports = GNet