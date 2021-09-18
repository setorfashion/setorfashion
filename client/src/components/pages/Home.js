import React, { useState, useEffect, useRef } from 'react'

import Loading from '../loader'
import { CardPost } from '../posts/CardPost'

const axios = require('axios').default
const API = require('../../Api')

const Home = () => {
  const [data, setData] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const lastRef = useRef(null)
  function setPage() {
    let prev = parseInt(nextPage)
    prev++
    setNextPage(nextPage + 1)
  }
  useEffect(() => {
    axios.get(API.AMBIENTE + `/post/getallposts/${nextPage}`)
      .then((result) => {
        if (result.data.totalPages === result.data.page) {
          setHasMore(false)
        }
        const prev = [...data, ...result.data.docs]
        setData(prev)
      }).catch(err => {
        console.log(JSON.stringify(err))
      })
  }, [nextPage])
  return (
    <div className="home a-CardView-media a-CardView-media--body  a-CardView-media--cover pz-Media">
      {data.length === 0 ? <Loading /> : <CardPost data={data} postRef={lastRef} scrollToPost={false} setPage={setPage} hasMore={hasMore} />}
    </div>
  )
}

export default Home
