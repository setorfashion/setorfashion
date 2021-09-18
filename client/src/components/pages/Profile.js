import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import insta_logo_color from "../images/insta_icon_color.png"
import whats_logo from "../images/logo_whatsapp.png"
// import { UserContext } from '../../App'
import Loading from '../loader'
import { useCookies } from 'react-cookie';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import M from 'materialize-css'
import Galery from '../profile/Galery'
import MessageUser from '../profile/MessageUser'
import MessageAdmin from '../profile/MessageAdmin'
import StoreBar from '../profile/StoreBar'
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
    console.log(storeId)
    // const { state, dispatch } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [load, setLoad] = useState(true)
    const [storeData, setStoreData] = useState()
    let isAdmin = false
    const history = useHistory()
    if (!storeId || storeId === undefined || storeId === 'undefined') {
        M.toast({ html: "Loja Indiponível no momento, por favor tente mais tarde ", classes: TOAST_ERROR })
        history.push('/');
    }
    // if (state === 'USER') {
    //     if (cookies.store_id === storeId) {
    //         history.push('/config')
    //     }
    // }

    // if(state === 'USER' || state === 'STORE'){
    //     if (cookies.store_id === storeId) {
    //         if(posts.length>0){
    //             if(posts[0].postedBy._id!==storeId){
    //                 window.location.reload()
    //             }
    //         }
    //         isAdmin = true
    //     }
    // }
    function openBlank(url) {
        window.open(url, '_blank')
    }
    useEffect(() => {
        axios.post(API.AMBIENTE + "/store/getstorebyid",
            {   id: storeId }
            ).then((result) => {
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
    const renderConteudo = () => {
        return (
            <>
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
                    {storeData ? <StoreBar storeData={storeData}/> : ''}
                </div>
                <div>
                    {posts.length === 0 ? isAdmin?<MessageAdmin/>: <MessageUser/> : <Galery posts={posts} storeId={storeId}/>}
                </div>
            </>
        )
    }
    return (
        <div style={{ maxWidth: "550px", margin: "0px auto", paddingTop: "30px", paddingBottom: '40px' }}>
            {load ? <Loading /> : renderConteudo()}
        </div>
    )

}

export default Profile
