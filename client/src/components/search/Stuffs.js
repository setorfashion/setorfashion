import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useLongPress from '../scripts/longPress'
import { useHistory } from 'react-router-dom'
// import pinchZoom from '../scripts/pressZoom'

export default function Stuffs({ stuffs, val }) {
  const history = useHistory()

  function loadStoreFeed(store_Id, post_Id) {

    sessionStorage.setItem('lastSearch',JSON.stringify({
      "local": "stuff",
      "posts": stuffs,
      "input_val": val.value
      }))
    history.push(
        {
          pathname: `/storeposts`,
          search: `?postId=${post_Id}&storeId=${store_Id}`
        }
    )
}
const onLongPress = () => {
  console.log('longpress is triggered ');
};

const onClick = () => {
  console.log('click is triggered')
}

const defaultOptions = {
  shouldPreventDefault: true,
  delay: 500,
};
const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

return (
  stuffs.map((item, key) => {
    return (
      // {...longPressEvent}
      <div key={key} onClick={() => loadStoreFeed(item.postedBy._id, item._id)} id={item._id} className='card_search_post'>
        <LazyLoadImage className='img_search_post' id={item._id} src={item.media_url} />
      </div>

    )
  })
)
}
