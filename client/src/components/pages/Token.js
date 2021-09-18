import React, { useEffect, useState } from 'react'
import { useLocation} from "react-router-dom"
import { useSelector } from 'react-redux'
import history  from  '../../services/history'
import insta_logo from "../images/insta_icon_white.png"
import Loading from '../loader'
import M from 'materialize-css'
const axios = require(`axios`).default
const { TOAST_ERROR, TOAST_SUCCESS } = require('../../classes')
const API = require('../../Api')





const Token = () => {
    const state = useSelector(state =>state.auth)
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const [load, setLoad] = useState(true)
    const authCode = query.get("code");
    const jwt = state.token
    const storeId = state.storeId
    const [statusToken, setStatusToken] = useState(false)

    function desvincular() {
        var toastHTML = '<span>Você tem certeza que deseja desvincular o instagram do perfil da sua loja? Todas as publicações vinculadas serão excluidas!</span><button class="btn-flat toast-action yes" id="desvincular" style={{color:"black"}}>Sim</button><button id="cancelar" class="btn-flat toast-action">Não</button>';
        let alert = M.toast({ html: toastHTML, displayLength: 30000, inDuration: 600, outDuration: 0 });

        document.getElementById('cancelar').addEventListener(('click'), () => {
            alert.dismiss()
        })
        document.getElementById('desvincular').addEventListener(('click'), () => {
            alert.dismiss()

            axios.post(API.AMBIENTE + '/token/canceltoken', { storeId: storeId },
                {
                    headers: {
                        "authorization": "Bearer " + jwt,
                        "Content-Type": "application/json"
                    },
                }).then((result) => {
                    const status = result.status
                    if (status === 200) {
                        M.toast({ html: result.data.msg, classes: TOAST_SUCCESS });
                        setTimeout(() => {
                            history.push('/profile?storeId=' + storeId)
                        }, 3000);
                    } else {
                        M.toast({ html: result.data.msg, classes: TOAST_ERROR });
                    }
                }).catch(err => {
                    console.log('erro: ' + err)
                })
        })


    }

    useEffect(() => {
        async function vincular() {
            await axios.post(API.AMBIENTE + '/token', {authCode: authCode} ,{
                headers: {
                    "authorization": "Bearer " + jwt,
                    "Content-Type": "application/json"
                }
            }).then((result) => {
                setTimeout(() => {
                    history.push('/profile?storeId=' + storeId);
                }, 50);
            }).catch(err => {
                console.log(err)
            })
        }
        if (authCode) {
            vincular()
        }
    }, [])

    useEffect(() => {
        axios.get(API.AMBIENTE + '/token/checktoken', {
            headers: {
                "authorization": "Bearer " + jwt
            }
        }).then((result) => {
                setLoad(false)
                const status =  result.status
                if (status===200) {
                    if (!authCode) {
                        setStatusToken(true)
                    }
                }
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