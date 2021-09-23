import React, { useState, useEffect } from 'react'

import { getAutoCompleteStuff, getAutoCompleteStores, getCategoriesAndSubCategories } from '../scripts/autocomplete'
import { MainSearch } from './Main'
import { useDispatch, useSelector } from 'react-redux'
import * as actionsStuffs from '../../store/module/searchStuffs/actions'

const SearchPage = () => {
  const dispatch = useDispatch()
  const state = useSelector(state =>state.search)
  const [stores, setStores] = useState([])
  const [stuffs, setStuff] = useState([])
  const [categoriesData, setcCtegoriesData] = useState([])
  // const [activated, setActivated] = useState()
  const [inputValueState, setInputValueState] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let tabActive = ''

  useEffect(() => {

      // const state = JSON.parse(sessionStorage.getItem('lastSearch'))
      setStuff(state.stuff.results)
      setStores(state.stores.results)
      if(state.type==='stuff' && state.stuff.inputValue){
          setInputValueState(state.stuff.inputValue)
      }
      if(state.type==='stores' && state.stores.inputValue){
          setInputValueState(state.stores.inputValue)
      }
      const promise = [getCategoriesAndSubCategories()]
      Promise.all(promise).then((rs) => {
        setcCtegoriesData(rs[0])
      })
  }, [])

  async function Search(value) {
    setIsLoading(true)
    const inputValue = value.target.value
    setInputValueState(value.target.value)
    tabActive = document.querySelectorAll('a.active')
    tabActive = tabActive[0].getAttribute('data')
    if (tabActive === 'stores') {
      const promise = [getAutoCompleteStores(inputValue)]
      Promise.all(promise).then((rs) => {
        dispatch(actionsStuffs.searchResult({inputValue:inputValue.toLowerCase(), activatedTab: tabActive, stores: rs[0]}))
        setIsLoading(false)
        setStores(rs[0])
      })
    } else if (tabActive === 'stuff') {
      if(inputValue){
        const promise = [getAutoCompleteStuff(inputValue)]
        Promise.all(promise).then((rs) => {
          dispatch(actionsStuffs.searchResult({inputValue:inputValue.toLowerCase(), activatedTab: tabActive, posts: rs[0]}))
          setIsLoading(false)
          setStuff(rs[0])
        })
      }

    }
  }
  return (
      <MainSearch
        stores={stores}
        stuffs={stuffs}
        categoriesData={categoriesData}
        Search={Search}
        inputValue={inputValueState}
        isLoading={isLoading}
      />
  )
}

export default SearchPage
