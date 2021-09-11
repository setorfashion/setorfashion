import React,{useEffect,createContext,useReducer, useContext} from 'react'
import NavBar from './components/Navbar'
import BottomBar from './components/footer'
import Home from './components/pages/Home'
import Token from './components/pages/Token'
import StoreFeed from './components/pages/StoreFeed'
import StorePosts from './components/pages/StorePosts'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Profile from './components/pages/Profile'
import CreatePost from './components/pages/CreatePost'
import ConfigStore from './components/pages/ConfigStore'
import Search from './components/pages/Search'
import {reducer,initialState} from './reducers/userReducer'
import { useCookies } from "react-cookie";
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import './App.css'


// alteração de ambiente no arquivo CLASSES.JS alterar variavel AMBIENTE para o valor /api/, homologação fica vazio

export const UserContext = createContext()

const Routing = () =>{


  const history = useHistory();
  const {dispatch} = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(()=>{
    const user = cookies.userData
    const store = cookies.store_id
    if(store && store!==''){
      dispatch({type:"STORE",payload:"STORE"})
      // history.push('/')
    }else if(user){
      dispatch({type:"USER",payload:"USER"})
      // history.push('/config')
    }
    else{
      dispatch({type:"CLEAR",payload:"CLEAR"})
      // history.push('/')
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
      <Route  path='/storefeed'  component={StoreFeed}>
        <StoreFeed></StoreFeed>
      </Route>
      <Route  path='/storeposts'  component={StorePosts}>
        <StorePosts></StorePosts>
      </Route>
      <Route  path='/search'>
        <Search></Search>
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
          <BottomBar/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
