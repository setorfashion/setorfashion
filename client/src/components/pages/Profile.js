import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import insta_logo from "../images/insta_icon_white.png"
import { UserContext } from '../../App'
import Loading from '../loader'
import { useCookies } from 'react-cookie';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const API = require('../../Api')


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
    const history = useHistory()

    if (state === 'USER') {
        if(cookies.storeId===storeId){
            history.push('/config')
        }        
    }
    useEffect(() => {
        // fetch(API.AMBIENTE + '/token/getInstagramData', {
        //     method: 'get',
        //     headers: {
        //         'Content-Type':'application/json',
        //         "authorization": "Bearer " + jwt,
        //     }
        // }).then(res => res.json())
        // .then((result) => {
        //     if(result.data){
        //         console.log('retorno')
        //         setPosts(result.data.data)
        //     }else{

        //     }

        // }).catch(err => {
        //     console.log(JSON.stringify(err))
        // })
        fetch(API.AMBIENTE + "/post/getstoreposts", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                storeId: storeId
            }),
            method: "Post"
        }).then(res => res.json()).then((result) => {
            // console.log(result)
            setLoad(false)
            setPosts(result)
        }).catch(err => {
            console.log(err);
        })
    }, [])
    const renderMsg = () => {
        return (
            <div style={{ textAlign: 'center', padding: '30px 10px 10px 10px' }}>
                <h3>Ops!</h3>
                <h6>Você não possui nenhuma publicação, deseja vincular sua loja a um perfil do instagram e acessar todas as publicações?</h6>
                <div style={{ margin: '0px 0px 50px 0px' }}>
                    <a style={{ marginTop: '20px' }} className='btn instagram' href={'https://api.instagram.com/oauth/authorize?' + API.INSTACONFIG}>
                        <img src={insta_logo} style={{ width: '25px', float: 'left', marginRight: '10px', marginTop: '6px' }}/>
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

    const renderGalery = () => {
        return (
            <div className="galery">
                {
                    posts.map((item, key) => {
                        return (
                            <div key={key} style={{width:'33%',margin:'0px 1px 0px 0px'}}>
                                <LazyLoadImage effect="blur" key={key} className='item' alt={item.title} src={item.photo != 'no image' ? API.AMBIENTE + '/post/getpostimage/' + item.photo : item.media_url} />
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
                <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", borderBottom: "1px solid gray" }}>
                    <div>
                        <LazyLoadImage effect="blur" className="imagemPerfil"
                            style={{ width: '25vw', height: "25vw", borderRadius: "50vw", maxWidth: "160px", maxHeight: "160px", justifyContent: "space-around" }}
                            src="https://cdn.pixabay.com/photo/2015/12/19/21/03/person-1100286_960_720.jpg" />
                    </div>
                    <div>
                        <h4>User name</h4>


                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h5>Infor 1</h5>
                            <h5>Infor 2</h5>
                            <h5>Infor 3</h5>

                        </div>
                    </div>

                </div>
                <div>

                    {posts.length === 0 ? renderMsg() : renderGalery()}
                </div>
            </div>
        )
    }
    return (
        <div style={{ maxWidth: "550px", margin: "0px auto", paddingTop: "30px" }}>
            {load ? <Loading /> : renderConteudo()}
        </div>
    )

}

export default Profile