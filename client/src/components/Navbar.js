import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from  'react-redux'
// import {UserContext} from '../App'
import insta_logo from "./images/insta_icon_white.png"
import { useCookies } from 'react-cookie';
import history from  '../services/history'
import * as actions from '../store/module/auth/actions'
import M from 'materialize-css'
const NavBar = ()=>{
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
  const state = useSelector(state =>state.auth)
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch() //disparador de açoes
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
        // console.log(cookies.store_id)
        const storeId = cookies.store_id

        return [
          <li key="profile" ><Link to={'/profile?storeId='+state.storeId}><i className="material-icons icons nav-icons" >person</i></Link></li>,
          <li key="config"><Link to='/config'><i className="material-icons icons nav-icons">settings</i></Link></li>,
          <li key="instagram"><Link to="/token"><img src={insta_logo} style={{width:'18px', float: 'left',marginTop: '19px'}}></img> </Link></li>,
          <li key="createpost"><Link to="/createpost"><i  className="material-icons icons nav-icons">add</i></Link></li>,
          <button key='logout' className='waves-effect waves-teal btn-flat' style={{marginTop:'13px'}} onClick={()=>{
            dispatch(actions.logout())
            // dispatch({type:"CLEAR"})
            history.push('/')
          }}><i  className="material-icons icons  nav-icons" style={{ color: 'red'}}>power_settings_new</i></button>
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
          <li key="signin"><Link to="/signin" style={{marginTop:'10px'}}>Entrar</Link></li>,
        ]
      }
      // return [
      //   <li key="signin"><Link to="/signin" style={{marginTop:'10px'}}>Entrar</Link></li>,
      // ]
    // }
    // else{
    //   return [
    //     // <li key="signup"><Link to="/signup" style={{marginTop:'10px'}}>Sou Lojista</Link></li>,
    //     <li key="signin"><Link to="/signin" style={{marginTop:'10px'}}>Entrar</Link></li>,

    //   ]
    // }
  }
    return (
        <nav className="nav">
        <div className="nav-wrapper " style={{color:'white'}}>
          {/* <img src={imgFeed} style={{width:'156px', marginTop:'-7px'}}></img> */}
          {/* <Link to="/" className="logo-font" >Ruma d' Feed</Link> */}
          {/* <Link to="/" className="logo-font-bk" ><span style={{fontSize:'3rem'}}>B</span>usca<span style={{fontSize:'3rem'}}>F</span>eed</Link> */}
          <Link to="/" className="logo-font" ><span style={{fontSize:'1.8rem'}}>B</span>usca<span style={{fontSize:'1.8rem'}}>F</span>eed</Link>
          <ul id="nav-mobile" className="right" style={{marginTop:"-10px"}}>
            {renderList()}
          </ul>
        </div>
      </nav>
    );
}

export default NavBar;
