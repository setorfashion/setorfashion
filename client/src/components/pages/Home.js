import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom"

const Home = () => {
    const params = useParams()
    var instaCod = '';
    console.log(params)
    if(params){
        instaCod = params.code
    }
    const instaconfig = new URLSearchParams({
        app_id: 261340495802382,
        redirect_uri: 'https://sf.fortaldelivery.com.br/token/',
        scope: 'user_profile,user_media',
        response_type: 'code'
    }) 
    const [data, setData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("jwt")

        fetch("/api/post/getallposts", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "Get"
        }).then(res => res.json()).then((result) => {
            setData(result)
        }).catch(err => {
            console.log('erro')
            console.log(JSON.stringify(err))
        })
    }, [])

    return (
        <div className="home">
                <a href={'https://api.instagram.com/oauth/authorize?'+instaconfig}>Instagram</a>
            {
                data.map((item,key) => {
                    return (
                        <div key={key} className="card home-card">
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={'/api/post/getpostimage/' + item.photo} />
                            </div>
                            <div className="card-content">
                                <h6>
                                    {item.title}
                                </h6>
                                <i className="material-icons icons">favorite</i>
                                <p>{item.body}</p>
                                <input type="text" placeholder="add comment" />
                            </div>
                        </div>
                    )
                })
            
            }

        </div>
    )
}

export default Home
