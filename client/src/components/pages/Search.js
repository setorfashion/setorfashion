import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize'
import { useHistory } from 'react-router-dom'
import { getAutoCompleteStuff, getAutoCompleteStores } from '../scripts/autocomplete'
import { MainSearch } from '../search/Main'

const SearchPage = () => {
  const [stores, setStores] = useState([])
  const [stuffs, setStuff] = useState([])
  const [activated, setActivated] = useState()
  const [inputValueState, setInputValueState] = useState()
  let tabActive = ''
  useEffect(() => {
    let el = document.querySelectorAll('.tabs');
    let tab = M.Tabs.init(el);
    if (sessionStorage.getItem('lastSearch')) {
      const state = JSON.parse(sessionStorage.getItem('lastSearch'))
      setActivated(state.local)
      setStuff(state.posts)
      setInputValueState(state.input_val)
    }
  }, [])

  function Search(value) {
    setActivated()
    const inputValue = value.target.value
    setInputValueState(value.target.value)
    tabActive = document.querySelectorAll('a.active')
    tabActive = tabActive[0].getAttribute('data')
    setActivated(tabActive)
    if (tabActive === 'stores') {
      const promise = [getAutoCompleteStores(inputValue)]
      Promise.all(promise).then((rs) => {
        setStores(rs[0])

      })
    } else if (tabActive === 'stuff') {
      const promise = [getAutoCompleteStuff(inputValue)]
      Promise.all(promise).then((rs) => {
        setStuff(rs[0])

      })
    }
  }
  return (
    <>
      <MainSearch
        stores={stores}
        stuffs={stuffs}
        Search={Search}
        activated={activated}
        inputValue={inputValueState}
      />
    </>
  )
}

export default SearchPage
