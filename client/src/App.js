import React,{useEffect,createContext,useReducer, useContext} from 'react'
import { Provider } from 'react-redux'
import {Router} from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import NavBar from './components/Navbar'
import BottomBar from './components/footer'

import history from './services/history'
import Routes from './routes/routes'
import store, {persistor} from  './store/index'
import './App.css'

export const UserContext = createContext()

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
            <NavBar />
            <Routes />
            <BottomBar/>
        </Router >
      </PersistGate>
    </Provider>
  );
}

export default App;
