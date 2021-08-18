import React,{useEffect,createContext,useReducer, useContext} from 'react'
import NavBar from './components/Navbar'
import Home from './components/pages/Home'
import Token from './components/pages/Token'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Profile from './components/pages/Profile'
import CreatePost from './components/pages/CreatePost'
import ConfigStore from './components/pages/ConfigStore'
import {reducer,initialState} from './reducers/userReducer'

import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import './App.css'

// alteração de ambiente no arquivo CLASSES.JS alterar variavel AMBIENTE para o valor /api/, homologação fica vazio

export const UserContext = createContext()

const Routing = () =>{


  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);


  useEffect(()=>{
    const user = localStorage.getItem('userData')
    const store = localStorage.getItem('store_id')
    if(store && store!==''){     
      dispatch({type:"STORE",payload:"STORE"})
      // history.push('/')
    }else if(user){
      dispatch({type:"USER",payload:"USER"})
      // history.push('/config')
    }
    else{
      dispatch({type:"USER",payload:"CLEAR"})
      history.push('/')
    }

  },[])
  return(
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/signup'>
        <Signup></Signup>
      </Route>
      <Route path='/signin'>
        <Login></Login>
      </Route>
      <Route path='/profile' component={Profile}>
        <Profile></Profile>
      </Route>      
      <Route path='/createpost'>
        <CreatePost></CreatePost>
      </Route>
      <Route path='/config'>
        <ConfigStore></ConfigStore>
      </Route>
      <Route  path='/token'  component={Token}>
        <Token></Token>
      </Route>
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
