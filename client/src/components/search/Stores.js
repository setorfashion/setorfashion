import React from 'react'
import noimage from "../images/noimage.png"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory } from "react-router-dom"

export default function Stores({stores}){
 
  const history = useHistory()
  return (
    stores.map((item, key) => {
        return (
            <div key={key} onClick={()=>history.push(`/profile?storeId=${item._id}`)} className="div-store" style={{ backgroundImage: 'linear-gradient(to top, white 90%, ' + item.setor.color + ' 80%)' }}>
                <div className='circle-g-new' style={{ background: "linear-gradient(white, white) padding-box, linear-gradient(to right, " + item.setor.color + " 0%, " + item.setor.color + " 100%) border-box" }}>
                    <LazyLoadImage className='img-circle' style={{ width: '49px', height: '49px' }} src={noimage} />
                </div>
                <div style={{ marginTop: '-50px', right: '10px', position:'absolute'}}>
                    <div >
                        <span style={{ fontWeight: 'bold', color: item.setor.color }}>{item.setor.description}</span>
                    </div>
                </div>
                <div>
                    <h5>{item.storeName}</h5>
                    <span style={{ fontSize: '14px' }}>
                        {item.address.street + ', ' + item.address.number}
                    </span>
                </div>
            </div>
        )
    })
)
}
