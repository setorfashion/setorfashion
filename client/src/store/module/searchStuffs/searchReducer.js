import * as types from '../types'
export const initialState = {
  type: 'stores',
  stuff: {
      inputValue: '',
      results: []
    },
  stores: {
    inputValue: '',
    results: []
  },
}
export default function (state=initialState,action){
  switch (action.type) {
    case types.SEARCH_RESULT:
      const values = JSON.parse(JSON.stringify(action.payload))
      console.log('chamou reducer '+values.inputValue)
      const newState = { ...state }
      newState.type = values.activatedTab
      if(values.activatedTab==='stores'){
        newState.stores.inputValue = values.inputValue
        newState.stores.results = values.stores
      }
      if(values.activatedTab==='stuff'){
        newState.stuff.inputValue = values.inputValue
        newState.stuff.results = values.posts
      }
      return newState
    case types.SEARCH_TAB:
      const tab = action.payload.activatedTab
      const newStateTab = { ...state }
      newStateTab.type =tab
      return newStateTab
    default:
      return state
  }
}
