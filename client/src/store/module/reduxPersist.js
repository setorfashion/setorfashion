import storage from  'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'BUSCA-FEED',
      storage,
      whitelist:[
        'auth',
        'search'
      ]
    },
    reducers
  )
  return persistedReducers
}