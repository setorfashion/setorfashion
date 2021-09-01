import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from "react-router-dom"
import insta_logo from "../images/insta_icon_white.png"
import Loading from '../loader'
import { useCookies } from 'react-cookie';
import M from 'materialize-css'
const {TOAST_ERROR,TOAST_SUCCESS} = require('../../classes')
const API = require('../../Api')





const Token = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const [load, setLoad] = useState(true)
    const authCode = query.get("code");
    const jwt = cookies.jwt
    const storeId = cookies.store_id
    const history = useHistory();
    const [statusToken, setStatusToken] = useState()

    function desvincular() {
        console.log('clicou desvincular')
    
        var toastHTML = '<span>Você tem certeza que deseja desvincular o instagram do perfil da sua loja? Todas as publicações vinculadas serão excluidas!</span><button class="btn-flat toast-action yes" id="desvincular" style={{color:"black"}}>Sim</button><button id="cancelar" class="btn-flat toast-action">Não</button>';
        let alert = M.toast({ html: toastHTML, displayLength: 30000,inDuration:600, outDuration:0 });
    
        document.getElementById('cancelar').addEventListener(('click'), () => {
            alert.dismiss()
        })
        document.getElementById('desvincular').addEventListener(('click'), () => {
            alert.dismiss()
            
            fetch(API.AMBIENTE + '/token/canceltoken', {
                method: 'post',
                headers: {
                    "authorization": "Bearer " + jwt,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "storeId": storeId
                })
            }).then((result) => {
                console.log(result)
                const status = result.status
                result.json().then(rs=>{
                    if(status===200){
                        M.toast({ html: rs.msg,classes:TOAST_SUCCESS});
                        setTimeout(() => {
                            history.push('/profile?storeId='+storeId)
                        }, 3000);
                    }else{                        
                        M.toast({ html: rs.msg,classes:TOAST_ERROR});
                    }
                })
                
                
                
            }).catch(err => {
                console.log('erro: '+err)
            })
        })
    
    
    }

    useEffect(() => {
        async function vincular() {
            await fetch(API.AMBIENTE + '/token', {
                method: 'post',
                headers: {
                    "authorization": "Bearer " + jwt,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "authCode": authCode
                })
            }).then(res => res.json()).then((result) => {
                // console.log('result vinculacao ' + result)
                setTimeout(() => {
                    history.push('/profile?storeId=' + storeId);
                }, 50);
            }).catch(err => {
                console.log(err)
            })
        }
        if (authCode) {
            // console.log('chamar vinculacao')
            vincular()
        }
    }, [])

    useEffect(() => {
        fetch(API.AMBIENTE + '/token/checktoken', {
            method: 'get',
            headers: {
                "authorization": "Bearer " + jwt,
            }
        })
            .then(res => res.json())
            .then((result) => {
                setLoad(false)
                if (result.data) {

                    if (!authCode) {
                        setStatusToken(result)
                    }
                }
                // if (!result.data && authCode) {
                //     vincular()
                // }
            }).catch(err => {
                console.log(err)
            })
    }, [])



    const content = () => {
        if (statusToken) {
            return (
                <div style={{ textAlign: 'center', padding: '10px 10px 10px 10px' }}>
                    <h5>Desvincular Instagram</h5>
                    <h6 style={{ color: 'red' }}>Lembrete: Todas as postagens da sua loja vinculadas ao Intagram serão apagadas.</h6>
                    <button className="btn black" onClick={() => desvincular()} style={{ marginTop: '20px' }}>
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
    const renderConteudo = () => {
        return (
            <div >
                <div style={{ textAlign: 'center', padding: '50px 10px 20px 10px' }}>
                    <h5>Status: {statusToken ? '  Vinculado' : 'Não Vinculado'}</h5>
                </div>

                <hr></hr>
                {content()}
            </div>
        )
    }
    return (

        <div style={{ paddingTop: '30px' }}>
            {load ? <Loading /> : renderConteudo()}
        </div>
    )
}


export default Token