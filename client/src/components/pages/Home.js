import React, { useState, useEffect } from 'react'

const Home = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("jwt")

        fetch("post/getallposts", {
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
            {
                data.map((item,key) => {
                    return (
                        <div key={key} className="card home-card">
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={'/post/getpostimage/' + item.photo} />
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
