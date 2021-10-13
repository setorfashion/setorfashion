import { func } from 'prop-types'
import * as types from '../types'

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload
  }
}
export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  }
}
export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload
  }
}

export function logout() {
  return {
    type: types.LOGOUT
  }
}

export function menu(payload){
  return {
    type: types.MENU,
    payload
  }
}
export function changeMenu(payload){
  return {
    type: types.MENU_CHANGE,
    payload
  }
}

export function updateState(payload) {
  return {
    type: types.UPDATE_STATE,
    payload
  }
}
