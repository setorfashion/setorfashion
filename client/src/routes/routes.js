import React from "react";
import {Switch} from 'react-router-dom'
import Home from '../components/pages/home'
import Token from '../components/pages/Token'
import StoreFeed from '../components/pages/StoreFeed'
import StorePosts from '../components/pages/storePosts/index'
import Login from '../components/pages/login/index'
import Signup from '../components/pages/Signup'
import Profile from '../components/pages/Profile'
import CreatePost from '../components/pages/CreatePost'
import ConfigStore from '../components/pages/ConfigStore'
import Search from '../components/search/Search'
import EditPosts from '../components/pages/editPosts'
import MyRoute from './myRoute'

export default function Routes() {

  return(
    <Switch>
      <MyRoute exact path='/' component={Home} />
      <MyRoute path='/signup' component={Signup}/>
      <MyRoute path='/signin' component={Login}/>
      <MyRoute path='/profile' component={Profile}/>
      <MyRoute path='/createpost' component={CreatePost} isClosed/>
      <MyRoute path='/config' component={ConfigStore} isClosed/>
      <MyRoute path='/editpost' component={EditPosts} isClosed/>
      <MyRoute  path='/token'  component={Token} />
      <MyRoute  path='/storefeed'  component={StoreFeed} />
      <MyRoute  path='/storeposts'  component={StorePosts} />
      <MyRoute  path='/search' component={Search}/>
    </Switch>
  )
}
