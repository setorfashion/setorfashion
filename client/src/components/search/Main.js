import React, { useState } from 'react'
import Stores from './Stores'
import Stuffs from './Stuffs'

export function MainSearch({ activated, stores, stuffs, Search, inputValue }) {
  console.log(activated)
  if(!activated) activated='stores'
  if (activated) {
    const tabActivated = document.getElementById(`tab_${activated}`)
    let input = document.getElementById(`search-input`)
    setTimeout(() => {
      if(tabActivated){
        tabActivated.click()
      }
      if(input){
        input.value = inputValue
      }
    }, 50);

  }
  return (
    <div key='search-content' className="search-content">
      <div key='search' className='search'>
        <div key='row' className="row">
          <div key='input-container' className="input-container">
            <div key='input-field' className="input-field">
              <i className="material-icons prefix" style={{ color: 'gray', marginTop: '5px', marginLeft: '5px' }}>search</i>
              <input autoComplete="off" onKeyUp={(e) => Search(e)} placeholder='Pesquisar' id='search-input' type="text" />
            </div>
          </div>
          <hr></hr>
          <div key='tabs' className="col s12" style={{ marginBottom: '20px', maxWidth: '614px', width: '100%' }}>
            <ul className="tabs">
              <li className="tab col s4 tab-item"><a data='stores' id='tab_stores' href="#stores">Lojas</a></li>
              <li className="tab col s4 tab-item"><a data='stuff' id='tab_stuff' href="#stuff">Produtos</a></li>
              <li className="tab col s4 tab-item"><a href="#categories">Categorias</a></li>
            </ul>
          </div>
          <div key='stores' className="content-results " id="stores">
            <Stores stores={stores} />
          </div>
          <div key='stuff' className="content-results " id="stuff">
            <div className="galery_search">
              <Stuffs stuffs={stuffs} val={document.getElementById('search-input')} />
            </div>
          </div>
          <div key='categories' className="content-results " id="categories">Categorias</div>
        </div>
      </div>
    </div>
  )
}
