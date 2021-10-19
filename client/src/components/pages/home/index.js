import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Loading from '../../loadingHome'
import { CardPost } from '../../posts/CardPost'
import { Component } from './styled'
import * as actions from "../../../store/module/auth/actions"
const axios = require('axios').default
const API = require('../../../Api')

const Home = () => {
  const [data, setData] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const lastRef = useRef(null)
  function setPage() {
    let prev = parseInt(nextPage)
    prev++
    setNextPage(nextPage + 1)
  }
  useEffect(() => {

    axios.get('https://www.instagram.com/buscafeed/?__a=1').then((rs)=>{
    // const jsonObj =  rs.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0,-1)
    // const obj = JSON.parse(jsonObj)
    console.log(rs)
    });

    setIsLoading(true)
    axios.get(API.AMBIENTE + `/post/getallposts/${nextPage}`)
      .then((result) => {
        if (result.data.totalPages === result.data.page) {
          setHasMore(false)
        }
        const prev = [...data, ...result.data.docs]
        setData(prev)
      }).catch(err => {
        console.log(JSON.stringify(err))
      }).finally(i=>setIsLoading(false))
  }, [nextPage])

  return (
    <Component className="a-CardView-media a-CardView-media--body  a-CardView-media--cover pz-Media">
      <Loading isLoading={isLoading} />
      <CardPost data={data} postRef={lastRef} scrollToPost={false} setPage={setPage} hasMore={hasMore} />
    </Component>
  )
}

export default Home
