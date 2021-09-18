import * as types from '../types'
export const initialState = {
  type: 'EMPTY',
  isLoggedIn: false,
  userData: {},
  storeId: '',
  token: '',
  isLoading: false
}
export default function (state=initialState,action){
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return state
    case types.LOGIN_SUCCESS:
      const {token, store_id, userData} = action.payload
      const type = store_id?'STORE':'USER'
      const newState = { ...state }
      newState.type =  type
      newState.isLoggedIn=true
      newState.userData= userData
      newState.storeId= store_id
      newState.token=token
      newState.isLoading= false
      return newState
    case types.LOGIN_FAILURE:
      return initialState //força o state vazio
    case types.LOGOUT:
      return initialState
    case types.UPDATE_STATE:
      const newStateUpdt = { ...state, ...action.payload }
      console.log(newStateUpdt)
      return newStateUpdt
    default:
      return state
  }
}
