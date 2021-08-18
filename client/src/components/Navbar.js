import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import insta_logo from "./images/insta_icon_white.png"
const NavBar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()

  const renderList = () =>{
    if(state){
      if(state==='USER'){
        return [
          <li key="config"><Link to="/config"><i className="material-icons icons" style={{fontSize:"18px"}}>settings</i></Link></li>,
          <li key="instagram"><Link to="/token"><img src={insta_logo} style={{width:'18px', float: 'left',marginTop: '19px'}}></img> </Link></li>,
          <button  key='logout' className='waves-effect waves-teal btn-flat' style={{marginTop:'-5px'}} onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/')
          }}><i  className="material-icons icons" style={{fontSize:"18px", color: 'red'}}>power_settings_new</i></button>
        ]
      }
      if(state==='STORE'){
        return [
          <li key="profile" ><Link to="/profile"><i className="material-icons icons " style={{fontSize:"18px"}}>person</i></Link></li>,
          <li key="config"><Link to="/config"><i className="material-icons icons" style={{fontSize:"18px"}}>settings</i></Link></li>,
          <li key="instagram"><Link to="/token"><img src={insta_logo} style={{width:'18px', float: 'left',marginTop: '19px'}}></img> </Link></li>,
          <li key="createpost"><Link to="/createpost"><i  className="material-icons icons" style={{fontSize:"18px"}}>add</i></Link></li>,
          <button key='logout' className='waves-effect waves-teal btn-flat' style={{marginTop:'-5px'}} onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/')
          }}><i  className="material-icons icons" style={{fontSize:"18px", color: 'red'}}>power_settings_new</i></button>
        ]
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
          <Link to="/" className="brand-logo left white-logo" style={{color:"white"}}>Setor Fashion</Link>
          <ul id="nav-mobile" className="right" style={{marginTop:"-10px"}}>
            {renderList()}
          </ul>
        </div>
      </nav>
    );
}

export default NavBar;
