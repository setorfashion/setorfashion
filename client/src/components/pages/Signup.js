import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import history from '../../services/history'
import validator from 'validator';
import M from 'materialize-css'
const {TOAST_ERROR,TOAST_SUCCESS} = require('../../classes');
const API = require('../../Api')

const Signup = ()=>{
  const [name,setName] = useState(""); //Armazena os dados dos inputs
  const [password,setPassword] = useState(""); //Armazena os dados dos inputs
  const [email,setEmail] = useState(""); //Armazena os dados dos inputs
  const PostData = ()=>{
    if(!validator.isEmail(email)){
      M.toast({html: "Informe um email válido", classes:TOAST_ERROR})
      return false;
    }
    fetch(API.AMBIENTE+"/auth/signup",{
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
                <Link to='/signin' className='font-black'>Já possuo uma conta</Link>
            </h6>
        </div>
      </div>
    )
}

export default Signup