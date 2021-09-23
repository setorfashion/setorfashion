import { call, put, all, takeLatest } from 'redux-saga/effects'
import M from 'materialize-css'
import * as actions from  './actions'
import * as types from '../types'
const API = require('../../../Api')
const axios = require(`axios`).default
const {TOAST_ERROR,TOAST_SUCCESS} = require('../../../classes')

function* searchTab({ payload }){
  console.log(payload)
  // const value = payload
  // try{
  //   console.log('saga searchRequest')
  //   const response = yield call(axios.post,API.AMBIENTE+"/search/autocompletestuff",{value})
  //   console.log(response.data)
  //   console.log('depois do result, chamar put')
  //   yield put (actions.searchSuccess({inputValue: value, posts: {...response.data}}))
  //   console.log('after put')
  //   // M.toast({html: "Seja Bem Vindo, "+response.data.userData.name+"!",classes:TOAST_SUCCESS})
  //   // history.push(prevPath)
  // } catch (e) {
  //   console.log(`erro ${e}`)
  //   M.toast({html: 'Email ou senha inválidos',classes:TOAST_ERROR})
  // }
}

export default all ([
  takeLatest(types.SEARCH_TAB,searchTab)
]) //irá processar somente o ultimo click no botao