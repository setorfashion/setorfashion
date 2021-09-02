import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
import { useCookies } from 'react-cookie';

const axios = require(`axios`).default
const {TOAST_ERROR,TOAST_SUCCESS} = require('../../classes')
const API = require('../../Api')

const Login = ()=>{
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const {state,dispatch} = useContext(UserContext)
  const [email,setEmail] = useState("");
  const [password,setpassword] = useState("");
  const history = useHistory();
  const logar = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Informe um email válido", classes:TOAST_ERROR})
      return false;
    }
    axios.post(API.AMBIENTE+'/auth/signin',{email,password},{
      headers:{
        "Content-Type":"application/json"
      },
    }).then(result=>{
      const status = result.status
      const data = result.data
      if(status===422){
        M.toast({html: data.error,classes:TOAST_ERROR})
      }else{
        const userData = data.userData;  
        setCookie('jwt',data.token, { path: '/' })    
        setCookie('userData',data.userData._id, { path: '/' })    
        setCookie('store_id',data.store_id, { path: '/' })  
        if(data.store_id!==''){
          dispatch({type:"STORE",payload:"STORE"})
        }else{
          dispatch({type:"USER",payload:"USER"})
        }       
        M.toast({html: "Seja Bem Vindo, "+userData.name+"!",classes:TOAST_SUCCESS})
        setTimeout(() => {
          if(data.store_id===''){
            history.push('/config');
          }else{
            history.push('/profile?storeId='+data.store_id);
          }
          
        }, 1000);
      }
    }).catch(err=>{
      console.log(err);
    })
  }
    return(
      <div className="myLoginCard">
        <div className="card auth-card center input-field">
            <h2 className="center">Login</h2>                         
            <input type="text" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}  placeholder="Email" />     
            <input type="password" name="password" id="password" onChange={(e)=>setpassword(e.target.value)} placeholder='Senha'/>
            <button onClick={()=>logar()} className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                Entrar
            </button>
            <h6 >
                <Link to='/signup' className='font-black'>Criar Conta</Link>
            </h6>
        </div>
      </div>
    )
}

export default Login