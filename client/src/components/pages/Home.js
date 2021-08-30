import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import M from 'materialize-css/dist/js/materialize'
import Loading from '../loader'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ShowMoreText from "react-show-more-text";

const API = require('../../Api')


const Home = () => {
    const [data, setData] = useState([])
    const params = useParams()

    const pinchZoom = (evt) => {
        const { id } = evt.target
        let imageElement = document.getElementById(id);
        let imageElementScale = 1;
        let start = {};
        // Calculate distance between two fingers
        const distance = (event) => {
            return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
        };

        imageElement.addEventListener('touchstart', (event) => {
            if (event.touches.length === 2) {
                event.preventDefault(); // Prevent page scroll      
                // Calculate where the fingers have started on the X and Y axis
                start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                start.distance = distance(event);
            }
        });

        imageElement.addEventListener('touchmove', (event) => {
            if (event.touches.length === 2) {
                event.preventDefault(); // Prevent page scroll
                let scale;

                if (event.scale) {
                    scale = event.scale;
                } else {
                    const deltaDistance = distance(event);
                    scale = deltaDistance / 200;
                }

                imageElementScale = Math.min(Math.max(1, scale), 4);

                const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 1; // x2 for accelarated movement
                const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 1; // x2 for accelarated movement

                const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
                imageElement.style.transform = transform;
                imageElement.style.WebkitTransform = transform;
                imageElement.style.zIndex = "99999";
            }
        });

        imageElement.addEventListener('touchend', (event) => {
            imageElement.style.transform = "";
            imageElement.style.WebkitTransform = "";
            imageElement.style.zIndex = "";
        });
    }

    let instaCod = '';
    if (params) {
        instaCod = params.code
    }
    setTimeout(() => {
        let options = {
            fullWidth: true,
            indicators: true,
            noWrap: true,
            duration: 200,
            pressed: false
        }
        let elems = document.querySelectorAll('.carousel');
        let instances = M.Carousel.init(elems, options);
    }, 300);

    const hideImage = (id) => {        
        const element = document.getElementById(id)
        console.log(id)
        element.setAttribute('hidden',true)

    }

    useEffect(() => {
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
            <LazyLoadImage effect="blur" onError={()=>hideImage('hc_'+key)} id={item._id} key={key} className='item' alt={item.title} src={item.photo !== 'no image' ? API.AMBIENTE + '/post/getpostimage/' + item.photo : item.media_url} />
        )
    }
    const caroulselImage = (item,father) => {
        return (
            <div className="carousel carousel-slider center a-CardView-media a-CardView-media--body  a-CardView-media--cover pz-Media">
                {
                    item.map((child, key) => {
                        return (
                            <div key={key} className="carousel-item ">
                                <LazyLoadImage id={child.id} onError={()=>hideImage(father)} effect="blur" className='item ' src={child.media_url} alt={item.title} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return (

        <div className="home a-CardView-media a-CardView-media--body  a-CardView-media--cover pz-Media">

            {data.length === 0 ? <Loading /> :

                data.map((item, key) => {
                        return (
                            <div key={key} className="card home-card " id={'hc_'+key}>
                                <div className='header-post' style={{ backgroundImage: 'linear-gradient(to top, white 90%, ' + item.postedBy.setor.color + ' 80%)' }}>
                                    <div className='circle-g' style={{ background: "linear-gradient(white, white) padding-box, linear-gradient(to right, " + item.postedBy.setor.color + " 0%, " + item.postedBy.setor.color + " 100%) border-box" }}>
                                        <LazyLoadImage className='img-circle' style={{ width: '32.5px', height: '32.5px', borderRadius: '45%', margin: '2px 2px 2px 2px' }} src={item.media_url} />
                                    </div>
                                    <div style={{ marginTop: '-5px', display: 'inline-block' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                            <a className='a-home-image' href={'/profile?storeId=' + item.postedBy._id}>{item.postedBy.storeName}</a>
                                        </span>
                                        <br></br>
                                        <span style={{ fontSize: '14px' }}>
                                            {item.postedBy.address.street + ', ' + item.postedBy.address.number}
                                        </span>
                                    </div>
                                    <div style={{ marginTop: '-5px', right: '0px', float: 'right' }}>

                                        <div style={{ paddingLeft: '15px' }}>
                                            <span style={{ fontWeight: 'bold', color: item.postedBy.setor.color }}>{item.postedBy.setor.description}</span>
                                        </div>
                                    </div>
                                </div>
                                <div onLoad={(e) => pinchZoom(e)} className="card-image home-images">
                                    {item.childrens.length > 0 ? caroulselImage(item.childrens,'hc_'+key) : simpleImage(item, key)}
                                </div>


                                <div className="card-content">
                                    <div style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                            <a className='a-home-image' href={'/profile?storeId=' + item.postedBy._id}>{item.postedBy.storeName}</a>
                                        </span>

                                    </div>
                                    <ShowMoreText className='a-home-image'
                                        /* Default options */
                                        lines={1}
                                        more="mais"
                                        less="menos"
                                        className="content-css"
                                        anchorClass="my-anchor-css-class"
                                        expanded={false}
                                        width={0}
                                        truncatedEndingComponent={"... "}
                                    ><p>{item.caption}</p></ShowMoreText>

                                </div>
                            </div>

                        )
                })
            }

        </div>

    )


}

export default Home
