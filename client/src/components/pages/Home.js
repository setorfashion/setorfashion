import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import Loading from '../loader'
import { CardPost } from '../posts/CardPost'

const axios = require('axios').default
const API = require('../../Api')

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(API.AMBIENTE + "/post/getallposts")
        .then((result) => {
            console.log(result.data)
            setData(result.data)
        }).catch(err => {
            console.log(JSON.stringify(err))
        })

    }, [])
    return (
        <div className="home a-CardView-media a-CardView-media--body  a-CardView-media--cover pz-Media">
            {data.length === 0 ? <Loading /> : <CardPost data={data} />}
        </div>
    )
}

export default Home
