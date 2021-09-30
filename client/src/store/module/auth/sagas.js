import { call, put, all, takeLatest } from 'redux-saga/effects'
import history from '../../../services/history'
import M from 'materialize-css'
import * as actions from  './actions'
import * as types from '../types'

const {TOAST_ERROR,TOAST_SUCCESS} = require('../../../classes')
const API = require('../../../Api')
const axios = require(`axios`).default

function* loginRequest({ payload }){
  const {email, password, prevPath} = payload
  try{
    const response = yield call(axios.post,API.AMBIENTE+'/auth/signin',payload)
    yield put (actions.loginSuccess({...response.data}))
    M.toast({html: "Seja Bem Vindo, "+response.data.userData.name+"!",classes:TOAST_SUCCESS})
    history.push(prevPath)
  } catch (e) {
    yield put(actions.loginFailure())
    M.toast({html: 'Email ou senha inválidos',classes:TOAST_ERROR})
  }
}

export default all ([
  takeLatest(types.LOGIN_REQUEST,loginRequest)
]) //irá processar somente o ultimo click no botao