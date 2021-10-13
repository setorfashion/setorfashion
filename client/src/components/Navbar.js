import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from  'react-redux'
import insta_logo from "./images/insta_icon_white.png"
import history from  '../services/history'
import * as actions from '../store/module/auth/actions'
import M from 'materialize-css'
import ConfigMenu from './pages/configMenu'

const NavBar = ()=>{
  const dispatch = useDispatch() //disparador de açoes

  function menu(value) {
    dispatch(actions.menu(value))
  }
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  });
  const state = useSelector(state =>state.auth)

  const renderList = () =>{
    // if(state){
      if(state.type==='USER'){
        return [
          <li key="config"><Link to="/config"><i className="material-icons icons nav-icons">settings</i></Link></li>,
          <li key="instagram"><Link to="/token"><img src={insta_logo} style={{width:'18px', float: 'left',marginTop: '19px'}}></img> </Link></li>,
          <button  key='logout' className='waves-effect waves-teal btn-flat' style={{marginTop:'13px'}} onClick={()=>{
            dispatch(actions.logout())
            history.push('/')
          }}><i  className="material-icons icons" style={{fontSize:"18px", color: 'red'}}>power_settings_new</i></button>
        ]
      }
      if(state.type==='STORE'){
        return [
          <li key="profile" ><Link o to={'/profile?storeId='+state.storeId}><i className="material-icons icons nav-icons" >person</i></Link></li>,
          // <li key="instagram"><Link to="/token"><img src={insta_logo} style={{width:'18px', float: 'left',marginTop: '19px'}}></img> </Link></li>,
          <li key="createpost"><Link  to="/createpost"><i  className="material-icons icons nav-icons">add</i></Link></li>,
          // <li key="config"><Link to='/config'><i className="material-icons icons nav-icons">menu</i></Link></li>,
          <li key="config"><i onClick={()=>menu(!state.menu)} className="material-icons icons nav-icons">menu</i></li>,
          <ul key='i0' id="slide-out" className="sidenav">
            <li key='i1'>
              <div className="user-view">
                <div className="background">
                </div>
                <a href="#user"></a>
                <a href="#name"><span className="white-text name">John Doe</span></a>
                <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
              </div>
            </li>
            <li key='i2'><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
            <li key='i3'><a href="#!">Second Link</a></li>
            <li key='i4'><div className="divider"></div></li>
            <li key='i5'><a className="subheader">Subheader</a></li>
            <li key='i6'><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
        ]
      }
      if (state.type==='CLEAR') {
        // <li key="profile" ><Link to={'/profile?storeId='} hidden><i className="material-icons icons " style={{fontSize:"18px"}}>person</i></Link></li>
        return [
          <li key="signup"><Link to="/signup" style={{marginTop:'10px'}}>Sou Lojista</Link></li>,
        ]
      }
      if (state.type==='EMPTY') {
        return [
          <li key="signin"><Link  to="/signin" style={{marginTop:'10px'}}>Entrar</Link></li>,
        ]
      }
  }
    return (
        <nav className="nav" >
        <div className="nav-wrapper " style={{color:'white'}}>
          <Link to="/"  className="logo-font" ><span style={{fontSize:'1.8rem'}}>B</span>usca<span style={{fontSize:'1.8rem'}}>F</span>eed</Link>
          <ul id="nav-mobile" className="right" style={{marginTop:"-10px"}}>
            {renderList()}
          </ul>
        </div>
        {state.menu?<ConfigMenu/>:''}
      </nav>

    );
}

export default NavBar;
