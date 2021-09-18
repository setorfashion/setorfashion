import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import Loading from '../loader'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CardPost } from '../posts/CardPost'
const axios = require(`axios`).default
const API = require('../../Api')

export default function Storeposts() {
  const history = useHistory()
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const postId = query.get("postId");
  const storeId = query.get("storeId");
  // window.history.pushState(state,'tx','/search')
  const postRef = useRef(null)
  const [data, setData] = useState([])

  useEffect(() => {
    axios.post(API.AMBIENTE + "/post/getstoreposts",
      { storeId: storeId }
    ).then((result) => {
      if (result.data.length > 0) {
        sessionStorage.setItem(storeId, JSON.stringify(result.data))
      }
      setData(result.data)
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className="home a-CardView-media a-CardView-media--body  a-CardView-media--cover pz-Media">
      {data.length === 0 ? <Loading /> : <CardPost data={data} _ref={postId} postRef={postRef} scrollToPost={true} />}
    </div>
  )
}


