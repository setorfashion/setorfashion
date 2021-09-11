import React from 'react'
import insta_logo from "../images/insta_icon_white.png"
const API = require('../../Api')

export default function MessageAdmin() {
  return (
    <div style={{ textAlign: 'center', padding: '30px 10px 10px 10px' }}>
        <h3>Ops!</h3>
        <h6>Você não possui nenhuma publicação, deseja vincular sua loja a um perfil do instagram e acessar todas as publicações?</h6>
        <div style={{ margin: '0px 0px 50px 0px' }}>
            <a style={{ marginTop: '20px' }} className='btn instagram' href={'https://api.instagram.com/oauth/authorize?' + API.INSTACONFIG}>
                <img src={insta_logo} style={{ width: '25px', float: 'left', marginRight: '10px', marginTop: '6px' }} />
                Vincular Instagram
            </a>
        </div>
        <h5>Ou</h5>
        <div>
            <a style={{ marginTop: '20px' }} className='btn black' href='/createpost'>
                Criar Nova Publicação
            </a>
        </div>
    </div>
)
}
