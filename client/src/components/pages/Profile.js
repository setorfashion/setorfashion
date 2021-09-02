import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import insta_logo from "../images/insta_icon_white.png"
import insta_logo_color from "../images/insta_icon_color.png"
import whats_logo from "../images/logo_whatsapp.png"
import { UserContext } from '../../App'
import Loading from '../loader'
import { useCookies } from 'react-cookie';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import M from 'materialize-css'
const axios = require(`axios`).default

const API = require('../../Api')
const { TOAST_ERROR, TOAST_SUCCESS } = require('../../classes')

const Profile = () => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    let query = useQuery();
    const storeId = query.get("storeId");
    
    const { state, dispatch } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [load, setLoad] = useState(true)
    const [storeData, setStoreData] = useState()
    let isAdmin = false
    const history = useHistory()
    
    if (!storeId || storeId === undefined || storeId === 'undefined') {
        M.toast({ html: "Loja Indiponível no momento, por favor tente mais tarde ", classes: TOAST_ERROR })
        history.push('/');
    }
    if (state === 'USER') {
        if (cookies.store_id === storeId) {
            history.push('/config')
        }
    }

    if(state === 'USER' || state === 'STORE'){
        if (cookies.store_id === storeId) {   
            if(posts.length>0){
                if(posts[0].postedBy._id!==storeId){
                    console.log(posts[0].postedBy._id,storeId);
                    window.location.reload()
                }
            }
            console.log(posts)
            isAdmin = true
        }
    }

    function openBlank(url) {
        window.open(url, '_blank')
    }

    function loadStoreFeed(postId) {
        history.push(`/storefeed?postId=${postId}&storeId=${storeId}`)
    }

    useEffect(() => {        
        axios.post(API.AMBIENTE + "/store/getstorebyid", 
            {   id: storeId }
            ).then((result) => {
            console.log(result.data)
            setStoreData(result.data)
        }).catch(err => {
            M.toast({ html: "Loja Indiponível no momento, por favor tente mais tarde ", classes: TOAST_ERROR })
            console.log(err);
            history.push('/')

        })
        axios.post(API.AMBIENTE + "/post/getstoreposts", 
            {storeId: storeId}
            ).then((result) => {
            if (result.data.length>0) {
                sessionStorage.setItem(storeId,JSON.stringify(result.data))
            }            
            setPosts(result.data)
            setTimeout(() => {
                setLoad(false)
            }, 300);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const renderStoreBar = () => {
        return (
            <div className='profile-store-bar' style={{ backgroundColor: `${storeData.dados.setor.color}`, padding: '5px', color: `${storeData.dados.setor.fontColor}` }}>
                <span>{`${storeData.dados.setor.description} - ${storeData.dados.address.street}, ${storeData.dados.address.number}`}</span>
            </div>
        )
    }
    const renderMsg = () => {        
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
    
    const renderMsgUser = () => {        
        return (
            <div style={{ textAlign: 'center', padding: '30px 10px 10px 10px' }}>
                <h3>Ops!</h3>
                <h6>Essa loja ainda não tem nenhuma publicação!</h6>
            </div>
        )
    }

    const renderGalery = () => {
        return (
            <div className="galery">
                {
                    posts.map((item, key) => {

                        return (
                            <div key={key}  onClick={() => loadStoreFeed(item._id)} className='profile-image-container'>
                                <LazyLoadImage onError={(e) => e.target.setAttribute('hidden', true)} effect="blur" id={key} key={key} className='item-galery' alt={item.title} src={item.photo != 'no image' ? API.AMBIENTE + '/post/getpostimage/' + item.photo : item.media_url} />
                            </div>
                        )
                    })

                }
            </div>
        )
    }
    const renderConteudo = () => {
        return (
            <div>
                <div style={{ display: "flex", width: '100vw', paddingBottom: '0px', maxWidth: '500px', paddingTop: '40px' }}>
                    <div style={{ width: '40vw', display: 'inline-block' }}>
                        <LazyLoadImage effect="blur" className="imagemPerfil"
                            style={{ width: '30vw', height: "30vw", borderRadius: "50%", marginLeft: '20px', maxWidth: "160px", maxHeight: "160px", justifyContent: "space-around" }}
                            src="https://cdn.pixabay.com/photo/2015/12/19/21/03/person-1100286_960_720.jpg" />
                    </div>
                    <div style={{ width: '70vw', textAlign: 'center' }}>
                        <h3>{storeData ? storeData.dados.storeName : 'Nenhum loja cadastrada'}</h3>
                        <h6>Descrição da loja</h6>
                    </div>

                </div>
                <div style={{ width: '100%', textAlign: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'inline-block' }} >
                        <div style={{ display: 'flex' }}>
                            <img src={insta_logo_color} style={{ width: '40px', height: '40px', display: 'flex' }} />
                            <h6 style={{ marginTop: '10px' }}>{storeData ? storeData.dados.instagram : '...'}</h6>
                        </div>
                    </div>
                    <div style={{ display: 'inline-block' }}>
                        <div onClick={() => openBlank(`https://wa.me/55${storeData ? storeData.dados.whatsapp : '...'}`)} style={{ display: 'flex' }}>
                            <img src={whats_logo} style={{ width: '40px', height: '40px', display: 'flex' }} />
                            <h6 style={{ marginTop: '10px', display: 'flex' }}>{storeData ? storeData.dados.whatsapp : '...'}</h6>
                        </div>
                    </div>
                </div>
                <div >
                    {storeData ? renderStoreBar() : ''}
                </div>
                <div>
                    {posts.length === 0 ? isAdmin?renderMsg():renderMsgUser() : renderGalery()}
                </div>
            </div>
        )
    }
    return (
        <div style={{ maxWidth: "550px", margin: "0px auto", paddingTop: "30px", paddingBottom: '40px' }}>
            {load ? <Loading /> : renderConteudo()}
        </div>
    )

}

export default Profile