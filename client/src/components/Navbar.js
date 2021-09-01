import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import insta_logo from "./images/insta_icon_white.png"
import { useCookies } from 'react-cookie';
import imgFeed from "./images/teste2.png"
const NavBar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const renderList = () =>{
    if(state){
      if(state==='USER'){
        return [
          <li key="config"><Link to="/config"><i className="material-icons icons" style={{fontSize:"18px"}}>settings</i></Link></li>,
          <li key="instagram"><Link to="/token"><img src={insta_logo} style={{width:'18px', float: 'left',marginTop: '19px'}}></img> </Link></li>,
          <button  key='logout' className='waves-effect waves-teal btn-flat' style={{marginTop:'15px'}} onClick={()=>{
            removeCookie('jwt')
            removeCookie('userData')
            removeCookie('store_id')
            dispatch({type:"CLEAR"})
            history.push('/')
          }}><i  className="material-icons icons" style={{fontSize:"18px", color: 'red'}}>power_settings_new</i></button>
        ]
      }
      if(state==='STORE'){
        // console.log(cookies.store_id)
        const storeId = cookies.store_id
        
        return [
          <li key="profile" ><Link to={'/profile?storeId='+storeId}><i className="material-icons icons " style={{fontSize:"18px"}}>person</i></Link></li>,
          <li key="config"><Link to='/config'><i className="material-icons icons" style={{fontSize:"18px"}}>settings</i></Link></li>,
          <li key="instagram"><Link to="/token"><img src={insta_logo} style={{width:'18px', float: 'left',marginTop: '19px'}}></img> </Link></li>,
          <li key="createpost"><Link to="/createpost"><i  className="material-icons icons" style={{fontSize:"18px"}}>add</i></Link></li>,
          <button key='logout' className='waves-effect waves-teal btn-flat' style={{marginTop:'24px'}} onClick={()=>{
            removeCookie('jwt')
            removeCookie('userData')
            removeCookie('store_id')
            dispatch({type:"CLEAR"})
            history.push('/')
          }}><i  className="material-icons icons" style={{fontSize:"18px", color: 'red'}}>power_settings_new</i></button>
        ]
      }else if (state==='CLEAR' || !state) {
        <li key="profile" ><Link to={'/profile?storeId='} hidden><i className="material-icons icons " style={{fontSize:"18px"}}>person</i></Link></li>
      }
      return [
        // <li key="signup"><Link to="/signup" style={{marginTop:'10px'}}>Sou Lojista</Link></li>,
        <li key="signin"><Link to="/signin" style={{marginTop:'10px'}}>Entrar</Link></li>,
        
      ]
    }else{
      return [
        // <li key="signup"><Link to="/signup" style={{marginTop:'10px'}}>Sou Lojista</Link></li>,
        <li key="signin"><Link to="/signin" style={{marginTop:'10px'}}>Entrar</Link></li>,
        
      ]
    }
  }
    return (        
        <nav className="nav">
        <div className="nav-wrapper " style={{color:'white'}}>
          {/* <img src={imgFeed} style={{width:'156px', marginTop:'-7px'}}></img> */}
          {/* <Link to="/" className="logo-font" >Ruma d' Feed</Link> */}
          <Link to="/" className="logo-font" >BuscaFeed</Link>
          <ul id="nav-mobile" className="right" style={{marginTop:"-10px"}}>
            {renderList()}
          </ul>
        </div>
      </nav>
    );
}

export default NavBar;
