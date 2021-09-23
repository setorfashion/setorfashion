import { all } from  'redux-saga/effects'

import authSaga from './auth/sagas'
// import searchStuffSaga from './searchStuffs/sagas'

export default  function* rootSaga(){
  return yield all([
    authSaga
  ])
}