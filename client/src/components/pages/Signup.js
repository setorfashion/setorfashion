import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css'
const {URL_BASE_SERVER} = require('../../urlsBase');
const {TOAST_ERROR,TOAST_SUCCESS} = require('../../classes');

const Signup = ()=>{
  const history = useHistory();
  const [name,setName] = useState(""); //Armazena os dados dos inputs
  const [password,setPassword] = useState(""); //Armazena os dados dos inputs
  const [email,setEmail] = useState(""); //Armazena os dados dos inputs
  const PostData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      console.log('entrou');
      M.toast({html: "Informe um email válido", classes:TOAST_ERROR})
      return false;
    }
    fetch("/api/auth/signup",{
        method: "post",
        headers: {
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          name,
          password,
          email
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error){
          M.toast({html: data.error, classes:TOAST_ERROR})
        }else{
          M.toast({html: data.success, classes: TOAST_SUCCESS})
          setTimeout(() => {
            history.push("/signin");
          }, 500);
          
        }
        
      }).catch(err=>{
        console.log(err);
      })
  }

    return(
      <div className="myLoginCard">
        <div className="card auth-card center input-field">
            <h2 className="center">Criar Conta</h2>          
            <input type="text" placeholder="Nome" value={name} onChange={(e)=>setName(e.target.value)} />                    
            <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />     
            <input type="password" placeholder='Senha' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={()=>PostData()} className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                Criar
            </button>
            <h6>
                <Link to='/signin'>Já tenho uma conta</Link>
            </h6>
        </div>
      </div>
    )
}

export default Signup