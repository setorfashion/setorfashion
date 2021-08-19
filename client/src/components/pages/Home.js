import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import M from 'materialize-css/dist/js/materialize'
import Loading from '../loader'


const API = require('../../Api')


const Home = () => {
    const [data, setData] = useState([])
    const params = useParams()
    var instaCod = '';
    if (params) {
        instaCod = params.code
    }
    setTimeout(() => {
        let options = {
            fullWidth: true,
            indicators: true,
            noWrap: true,
            duration: 200
        }
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, options);
        console.log(instances)
    }, 300);



    useEffect(() => {
        const token = localStorage.getItem("jwt")
        fetch(API.AMBIENTE + "/post/getallposts", {
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

    const simpleImage = (item, key) => {
        return (
            <img key={key} className='item' alt={item.title} src={item.photo != 'no image' ? API.AMBIENTE + '/post/getpostimage/' + item.photo : item.media_url} />
        )
    }
    const caroulselImage = (item) => {
        return (

            <div className="carousel carousel-slider center">

                {
                    item.map((child, key) => {
                        return (
                            <div key={key} className="carousel-item">
                                <img className='item' src={child.media_url} />
                            </div>
                        )


                    })
                }
            </div>
        )
    }

    return (

        <div className="home">
            {data.length === 0 ? <Loading /> :
                data.map((item, key) => {
                    return (
                        <div key={key} className="card home-card">

                            <div className="card-image">
                                {item.childrens.length > 0 ? caroulselImage(item.childrens) : simpleImage(item, key)}

                            </div>

                            <div style={{ backgroundImage: 'linear-gradient(to top, white 70%, ' + item.postedBy.setor.color + ')', paddingLeft: '15px' }}>
                                <span style={{ fontWeight: 'bold', color: item.postedBy.setor.color }}>{item.postedBy.setor.description}</span>
                            </div>
                            <div className="card-content">
                                <div style={{ justifyContent: 'space-between' }}>
                                    <div>
                                        <h6 style={{ fontWeight: 'bold' }}>
                                            {item.postedBy.storeName}
                                        </h6>
                                    </div>

                                </div>
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
