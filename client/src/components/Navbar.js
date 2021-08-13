import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'
const NavBar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const renderList = () =>{
    if(state){
      return [
        <li key="profile" ><Link to="/profile"><i className="material-icons icons " style={{fontSize:"18px"}}>person</i></Link></li>,
        <li key="config"><Link to="/config"><i className="material-icons icons" style={{fontSize:"18px"}}>settings</i></Link></li>,
        <li key="createpost"><Link to="/createpost"><i  className="material-icons icons" style={{fontSize:"18px"}}>send</i></Link></li>
      ]
    }else{
      return [
          <li key="signin"><Link to="/signin"><i className="material-icons icons " style={{fontSize:"18px"}}>person_outline</i></Link></li>,
          <li key="signup"><Link to="/signup"><i className="material-icons icons " style={{fontSize:"18px"}}>person_add</i></Link></li>
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
