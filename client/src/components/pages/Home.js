import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom"

const API = require('../../Api')
const Home = () => {
    const params = useParams()
    var instaCod = '';
    if(params){
        instaCod = params.code
    }


    const [data, setData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("jwt")
        fetch(API.AMBIENTE+"/post/getallposts", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "Get"
        }).then(res => res.json()).then((result) => {
            console.log(result.postedBy)
            console.log(result)
            result.map(item=>{
                console.log(item.postedBy)
            })
            setData(result)
        }).catch(err => {
            console.log('erro')
            console.log(JSON.stringify(err))
        })
    }, [])

    return (
        <div className="home">
            
                
            {
                data.map((item,key) => {
                    return (
                        <div key={key} className="card home-card">
                            <div className="card-image">
                                <img src={item.photo!='no image'?API.AMBIENTE+'/post/getpostimage/' + item.photo:item.media_url} />
                            </div>
                            <div className="card-content">
                                <h6>
                                    {item.title}
                                </h6>
                                <i className="material-icons icons">favorite</i>
                                <p>{item.caption}</p>
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
