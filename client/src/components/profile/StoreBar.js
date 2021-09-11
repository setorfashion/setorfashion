import React from 'react'

export default function StoreBar({storeData}) {
  return (
    <div className='profile-store-bar' style={{ backgroundColor: `${storeData.dados.setor.color}`, padding: '5px', color: `${storeData.dados.setor.fontColor}` }}>
        <span>{`${storeData.dados.setor.description} - ${storeData.dados.address.street}, ${storeData.dados.address.number}`}</span>
    </div>
)
}
