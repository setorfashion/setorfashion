import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import Loading from '../../loading'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CardPost } from '../../posts/CardPost'
import { Container } from './styled';
const axios = require(`axios`).default
const API = require('../../../Api')

export default function Storeposts() {
  const history = useHistory()
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const postId = query.get("postId");
  const storeId = query.get("storeId");
  const postRef = useRef(null)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (sessionStorage.getItem(storeId)) {
      const dt = JSON.parse(sessionStorage.getItem(storeId))
      setData(dt)
      setIsLoading(false)
    } else {
      axios.post(API.AMBIENTE + "/post/getstoreposts",
        { storeId: storeId }
      ).then((result) => {
        if (result.data.length > 0) {
          sessionStorage.setItem(storeId, JSON.stringify(result.data))
        }
        setIsLoading(false)
        setData(result.data)
      }).catch(err => {
        console.log(err);
      })
    }
  }, [])

  return (
    <Container className="a-CardView-media a-CardView-media--body  a-CardView-media--cover pz-Media">
      <Loading isLoading={isLoading} />
      {<CardPost data={data} _ref={postId} postRef={postRef} scrollToPost={true} />}
    </Container>
  )
}


