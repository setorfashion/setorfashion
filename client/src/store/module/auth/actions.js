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

export function updateState(payload) {
  return {
    type: types.UPDATE_STATE,
    payload
  }
}
