import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import insta_logo_color from "../images/insta_icon_color.png"
import whats_logo from "../images/logo_whatsapp.png"
import Loading from '../loading'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import M from 'materialize-css'
import Galery from '../profile/Galery'
import MessageUser from '../profile/MessageUser'
import MessageAdmin from '../profile/MessageAdmin'
import StoreBar from '../profile/StoreBar'
const axios = require(`axios`).default

const API = require('../../Api')
const { TOAST_ERROR } = require('../../classes')

const Profile = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const storeId = query.get("storeId");
  const [posts, setPosts] = useState([])
  const [storeData, setStoreData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  let isAdmin = false
  const history = useHistory()
  if (!storeId || storeId === undefined || storeId === 'undefined') {
    M.toast({ html: "Loja Indiponível no momento, por favor tente mais tarde ", classes: TOAST_ERROR })
    history.push('/');
  }
  function openBlank(url) {
    window.open(url, '_blank')
  }
  useEffect(async () => {
    setIsLoading(true)
    await axios.post(API.AMBIENTE + "/store/getstorebyid",
      { id: storeId }
    ).then((result) => {
      setStoreData(result.data)
    }).catch(err => {
      M.toast({ html: "Loja Indiponível no momento, por favor tente mais tarde ", classes: TOAST_ERROR })
      // console.log(err);
      history.push('/')
    })
    await axios.post(API.AMBIENTE + "/post/getstoreposts",
      { storeId: storeId }
    ).then((result) => {
      if (result.data.length > 0) {
        sessionStorage.setItem(storeId, JSON.stringify(result.data))
      }
      setPosts(result.data)
    }).catch(err => {
      console.log(err);
    })
    setIsLoading(false)
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
          {storeData ? <StoreBar storeData={storeData} /> : ''}
        </div>
        <div>
          {posts.length === 0 ? isAdmin ? <MessageAdmin /> : <MessageUser /> : <Galery posts={posts} storeId={storeId} />}
        </div>
      </>
    )
  }
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto", paddingTop: "30px", paddingBottom: '40px' }}>
      <Loading isLoading={isLoading} />
      {renderConteudo()}
    </div>
  )

}

export default Profile
