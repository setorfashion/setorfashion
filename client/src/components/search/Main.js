import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize'
import Stores from './Stores'
import Stuffs from './Stuffs'
import Categories from './Categories'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/module/searchStuffs/actions'

export function MainSearch({ stores, stuffs, categoriesData, Search, isLoading }) {
  const state = useSelector(state => state.search)
  const dispatch = useDispatch()
  // let input = document.getElementById(`search-input`)
  // if (input) {
  //   switch (state.type) {
  //     case 'stores':
  //       // input.value = state.stores.inputValue
  //       break;
  //     case 'stuff':
  //       //input.value = state.stuff.inputValue
  //       break;
  //     default:
  //       break;
  //   }
  // }
  useEffect(() => {
    let el = document.querySelectorAll('.tabs');
    const tab = M.Tabs.init(el);
    tab[0].select(state.type)
    tab[0].updateTabIndicator()
  }, [])
  const changeState = (type) => {
    if (type === 'stuff') {
      let input = document.getElementById(`search-input`)
      input.value = state.stuff.inputValue
      dispatch(actions.searchTab({ activatedTab: type }))
    }
    else if (type === 'stores') {
      let input = document.getElementById(`search-input`)
      input.value = state.stores.inputValue
      dispatch(actions.searchTab({ activatedTab: type }))
    }
    else if (type === 'categories') {

    }
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
            <div key='select-field' className="input-field" hidden id="select_categories">
              <i className="material-icons prefix" style={{ color: 'gray', marginTop: '5px', marginLeft: '5px' }}>search</i>
              <input autoComplete="off" onKeyUp={(e) => Search(e)} placeholder='Pesquisar' id='search-input' type="text" />
            </div>
          </div>
          <hr></hr>
          <div key='tabs' className="col s12" style={{ marginBottom: '20px', maxWidth: '614px', width: '100%' }}>
            <ul className="tabs">
              <li className="tab col s4 tab-item" ><a data='stores' onClick={() => changeState('stores')} href="#stores">Lojas</a></li>
              <li className="tab col s4 tab-item" ><a data='stuff' onClick={() => changeState('stuff')} href="#stuff">Produtos</a></li>
              <li className="tab col s4 tab-item"><a onClick={() => changeState('categories')} href="#categories">Categorias</a></li>
            </ul>
          </div>
          <div key='stores' className="content-results" id="stores">
            <Stores stores={stores} isLoading={isLoading} />
          </div>
          <div key='stuff' className="content-results" id="stuff">
            <div className="galery_search">
              <Stuffs stuffs={stuffs} isLoading={isLoading} val={document.getElementById('search-input')} />
            </div>
          </div>
          <div key='categories' className="content-results " id="categories">
            <Categories categoriesData={categoriesData} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
