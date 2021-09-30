import React, { useEffect, useCallback, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ShowMoreText from "react-show-more-text";
import { pinchZoom } from '../scripts/pinchZoom'
import { CarouselPost, SimpleImage } from './LoadImages'
import { CardContainer,  CardImage, CardDescribeContent, CardHeader, ImageCircle, ImageByCicle, HeaderDescription, HeaderLocalInformation } from './styled';

export function CardPost({ data, _ref, postRef, scrollToPost, setPage, hasMore, hasEdit }) {
  const observer = useRef()
  const lastPostElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage()
        observer.current.disconnect()
      }
    })
    if (node) observer.current.observe(node)
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
        <CardContainer key={key} ref={(_ref === item._id) ? postRef : (data.length === key + 1) ? lastPostElementRef : null} id={'hc_' + key}>
            <CardHeader style={{ backgroundImage: 'linear-gradient(to top, white 90%, ' + item.postedBy.setor.color + ' 80%)' }}>
              <ImageCircle style={{ background: "linear-gradient(white, white) padding-box, linear-gradient(to right, " + item.postedBy.setor.color + " 0%, " + item.postedBy.setor.color + " 100%) border-box" }}>
                <ImageByCicle  src={item.media_url} />
              </ImageCircle>
              <HeaderDescription >
                <a href={'/profile?storeId=' + item.postedBy._id}>{item.postedBy.storeName}</a>
                <br></br>
                <span>
                  {item.postedBy.address.street + ', ' + item.postedBy.address.number}
                </span>
              </HeaderDescription>
              <HeaderLocalInformation>
                  <span  style={{color: item.postedBy.setor.color }}>{item.postedBy.setor.description}</span>
              </HeaderLocalInformation>
            </CardHeader>
            <CardImage onLoad={(e) => pinchZoom(e)} className="card-image home-images">
              {item.childrens.length > 0 ? <CarouselPost item={item.childrens} father={'hc_' + key} /> : <SimpleImage item={item} _key={key} />}
            </CardImage>
            <CardDescribeContent>
              <a href={'/profile?storeId=' + item.postedBy._id}>{item.postedBy.storeName}</a>
              {hasEdit?
              <>
                <div className="input-field">
                  <i className="material-icons prefix" >edit</i>
                  <input type="text" value={item.caption}/>
                </div>
                <div className="sendPosition">
                  <i className="material-icons" style={{color:'black !important'}}>send</i>
                </div>
              </>
              :<ShowMoreText
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
            }
            </CardDescribeContent>
        </CardContainer>
      )

    }

    )
  )
}
