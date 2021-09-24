import React, { useEffect, useCallback, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ShowMoreText from "react-show-more-text";
import { pinchZoom } from '../scripts/pinchZoom'
import { CarouselPost, SimpleImage } from './LoadImages'

export function CardPost({ data, _ref, postRef, scrollToPost, setPage,hasMore}) {
  const observer = useRef()
  const lastPostElementRef = useCallback(node=>{
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && hasMore){
        setPage()
        observer.current.disconnect()
      }
    })
    if(node) observer.current.observe(node)
  })
  useEffect(() => {
    if (postRef && scrollToPost) {
      setTimeout(() => {
        postRef.current.scrollIntoView(
          { behavior: 'smooth', block: 'start' })
      }, 800);
    }

  }, [])

  return (
    data.map((item, key) => {
      return (
        <div key={key} ref={(_ref === item._id ) ? postRef : (data.length===key+1)?lastPostElementRef : null} className="card home-card " id={'hc_' + key}>
          <div className='header-post' style={{ backgroundImage: 'linear-gradient(to top, white 90%, ' + item.postedBy.setor.color + ' 80%)' }}>
            <div className='circle-g' style={{ background: "linear-gradient(white, white) padding-box, linear-gradient(to right, " + item.postedBy.setor.color + " 0%, " + item.postedBy.setor.color + " 100%) border-box" }}>
              <LazyLoadImage className='img-circle' style={{ width: '33px', height: '33px', borderRadius: '50%' }} src={item.media_url} />
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
            {item.childrens.length > 0 ? <CarouselPost item={item.childrens} father={'hc_' + key} /> : <SimpleImage item={item} _key={key} />}
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

    }

    )
  )
}
