import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux';
const API = require('../../Api')

export default function Galery({ posts, storeId }) {
  const history = useHistory()
  const state = useSelector(state=>state.auth)
  function loadStoreFeed(postId) {
    // history.push(`/storefeed?postId=${postId}&storeId=${storeId}`)
    if(state.storeId && state.storeId===storeId){
      console.log('dono do post')
      history.push({
        pathname:`/editpost`,
        search: `?postid=${postId}`
      })
    }else{
      history.push(
        {
          pathname: `/storeposts`,
          search: `?postId=${postId}&storeId=${storeId}`
        }
      )
    }
  }
  return (
    <div className="galery">
      {
        posts.map((item, key) => {
          return (
            <div key={key} onClick={() => loadStoreFeed(item._id)} className='profile-image-container'>
              <LazyLoadImage onError={(e) => e.target.setAttribute('hidden', true)} effect="blur" id={key} key={key} className='item-galery' alt={item.title} src={item.photo != 'no image' ? API.AMBIENTE + '/post/getpostimage/' + item.photo : item.media_url} />
            </div>
          )
        })
      }
    </div>
  )
}
