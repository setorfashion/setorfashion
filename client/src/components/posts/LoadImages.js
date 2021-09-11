import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import M from 'materialize-css/dist/js/materialize'
const API = require('../../Api')

function hideImage(id) {
  const element = document.getElementById(id)
  element.setAttribute('hidden', true)
}

export function CarouselPost({ item, father }) {

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

  return (
    <div className="carousel carousel-slider center a-CardView-media a-CardView-media--body  a-CardView-media--cover pz-Media">
      {
        item.map((child, key) => {
          return (
            <div key={key} className="carousel-item ">
              <img id={child.id} onError={() => hideImage(father)} effect="blur" className='item' src={child.media_url} alt={item.title} />
            </div>
          )
        })
      }
    </div>
  )
}
export function SimpleImage({ item, _key }) {
  return (
    <img effect="blur" onError={() => hideImage('hc_' + _key)} id={item._id} key={_key} className='item' alt={item.title} src={item.photo !== 'no image' ? API.AMBIENTE + '/post/getpostimage/' + item.photo : item.media_url} />
  )
}

