import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const {TOAST_ERROR,TOAST_SUCCESS} = require('../../classes');

const Login = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const [email,setEmail] = useState("");
  const [password,setpassword] = useState("");
  const history = useHistory();
  const logar = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Informe um email válido", classes:TOAST_ERROR})
      return false;
    }
    fetch('/auth/signin',{
      method: "post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error,classes:TOAST_ERROR})
      }else{
        const userData = data.userData;
        console.log(data)
        //armazenar dados do user no localstorange
        localStorage.setItem('jwt',data.token)
        localStorage.setItem('userData',JSON.stringify(data.userData))
        localStorage.setItem('store_id',data.store_id)
        
        dispatch({type:"USER",payload:data.userData})

        M.toast({html: "Seja Bem Vindo, "+userData.name+"!",classes:TOAST_SUCCESS})
        setTimeout(() => {
          history.push('/profile');
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
            <input type="text" onChange={(e)=>setEmail(e.target.value)}  placeholder="Email" />     
            <input type="password" onChange={(e)=>setpassword(e.target.value)} placeholder='Senha'/>
            <button onClick={()=>logar()} className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                Entrar
            </button>
            <h6>
                <Link to='/signup'>Criar conta</Link>
            </h6>
        </div>
      </div>
    )
}

export default Login