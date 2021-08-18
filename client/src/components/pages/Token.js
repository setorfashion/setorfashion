import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from "react-router-dom"
import insta_logo from "../images/insta_icon_white.png"

const API = require('../../Api')


const Token = () => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const authCode = query.get("code");
    const Auth = query.get("authorization_code");
    const jwt = localStorage.getItem('jwt')
    const history = useHistory();
    const [statusToken, setStatusToken] = useState()



    useEffect(() => {
        fetch(API.AMBIENTE + '/token/checktoken', {
            method: 'get',
            headers: {
                "authorization": "Bearer " + jwt,
            }
        }).then(res => res.json()).then((result) => {
            if(result){
                setStatusToken(result)
            }            
            if (!result && authCode) {
                console.log('asd')
                vincular()
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])

    if(authCode!=''){
        vincular()
    }

    const vincular = () => {
        fetch(API.AMBIENTE + '/token', {
            method: 'post',
            headers: {
                "authorization": "Bearer " + jwt,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "authCode": authCode
            })
        }).then(res => res.json()).then((result) => {
            setTimeout(() => {
                history.push('/profile');
            }, 500);
        }).catch(err => {
            console.log(err)
        })
    }
    const content = () => {
        if (statusToken) {
            return (
                <div style={{ textAlign: 'center', padding: '10px 10px 10px 10px' }}>
                    <h5>Desvincular Instagram</h5>
                    <h6 style={{ color: 'red' }}>Lembrete: Todas as postagens da sua loja vinculadas ao Intagram serão apagadas.</h6>
                    <button className="btn black" style={{ marginTop: '20px' }}>
                        <img src={insta_logo} style={{ width: '25px', float: 'left', marginRight: '10px', marginTop: '6px' }}></img>
                        Desvindular Instagram</button>

                </div>

            )
        } else {
            return (
                <div style={{ textAlign: 'center', padding: '50px 10px 30px 10px' }}>
                    <h5>Ativar Vínculo ao Intagram</h5>
                    <h6>O instagram irá permitir o acesso ao nome do usuário do perfil e mídias postadas (Fotos e Vídeos) </h6>
                    <a style={{ marginTop: '20px' }} className='btn instagram' href={'https://api.instagram.com/oauth/authorize?' + API.INSTACONFIG}>
                        <img src={insta_logo} style={{ width: '25px', float: 'left', marginRight: '10px', marginTop: '6px' }}></img>
                        Vincular Instagram
                    </a>
                    <h6 style={{ color: 'red' }}>Lembrete: O perfil da sua loja deve ser público!</h6>
                </div>
            )
        }
    }
    return (
        <div>
            <div style={{ textAlign: 'center', padding: '50px 10px 20px 10px' }}>
                <h5>Status: {statusToken ? '  Vinculado' : 'Não Vinculado'}</h5>
            </div>

            <hr></hr>
            {content()}

        </div>
    )
}


export default Token