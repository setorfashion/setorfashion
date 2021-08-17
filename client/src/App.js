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

import {BrowserRouter, Route, Switch, useHistory, useRouteMatch,useLocation} from 'react-router-dom'
import './App.css'

// alteração de ambiente no arquivo CLASSES.JS alterar variavel AMBIENTE para o valor /api/, homologação fica vazio

export const UserContext = createContext()

const Routing = () =>{


  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  let match = useRouteMatch();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  // const query = new URLSearchParams(this.props.location.search);
  // const code = query.get('code')
  // console.log(code)

  // useEffect(()=>{
  //   const user = JSON.parse(localStorage.getItem("userData"))
  //   if(user){
  //     dispatch({type:"USER",payload:user})
  //     history.push('/')
  //   }else{
  //     history.push('/')
  //     // history.push('/signin')
  //   }

  // },[])
  let query = useQuery();
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
      <Route path='/profile/'>
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
