import { persistStore } from 'redux-persist'
import {createStore, applyMiddleware} from 'redux'
import  createSagaMiddleware from 'redux-saga'
import rootReducer from './module/rootReducer'
import rootSaga from './module/rootSaga'

import persistedReducers from './module/reduxPersist'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(persistedReducers(rootReducer), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
export default store
