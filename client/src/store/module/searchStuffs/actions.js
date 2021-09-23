import * as types from '../types'

export function searchResult(payload) {
  return {
    type: types.SEARCH_RESULT,
    payload
  }
}
export function searchTab(payload) {
  return {
    type: types.SEARCH_TAB,
    payload
  }
}
// export function searchSuccess(payload) {
//   return {
//     type: types.SEARCH_STUFF_SUCCESS,
//     payload
//   }
// }

