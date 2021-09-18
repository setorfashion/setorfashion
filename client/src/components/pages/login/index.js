import React,{useState} from 'react'
import { useDispatch } from  'react-redux'
import {Link} from 'react-router-dom'
import validator from 'validator'
import { get } from 'lodash'
import M from 'materialize-css'
import * as actions from '../../../store/module/auth/actions'

const {TOAST_ERROR,TOAST_SUCCESS} = require('../../../classes')
// import * as actions from './actions'


export default function Login(props){
  const dispatch = useDispatch() //disparador de açoes
  const [email,setEmail] = useState("");
  const [password,setpassword] = useState("");

  //pega a pagina que o user estava tentando acessar antes de ser redirecionado para pagina de login
  const prevPath = get (props, 'location.state.prevPath','/') //busca o prevPath, caso nao exista redireciona para pagina principal após o login

  function handleSubmit() {
    if(!validator.isEmail(email)){
      M.toast({html: "Informe um email válido", classes:TOAST_ERROR})
      return false;
    }
    if(password.length<3){
      M.toast({html: "Senha Invãlida", classes:TOAST_ERROR})
      return false;
    }
    dispatch(actions.loginRequest({email, password, prevPath}))
  }

    return(
      <div className="myLoginCard">
        <div className="card auth-card center input-field">
            <h2 className="center">Login</h2>
            <input type="text" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}  placeholder="Email" />
            <input type="password" name="password" id="password" onChange={(e)=>setpassword(e.target.value)} placeholder='Senha'/>
            <button onClick={()=>handleSubmit()} className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                Entrar
            </button>
            <h6 >
                <Link to='/signup' className='font-black'>Criar Conta</Link>
            </h6>
        </div>
      </div>
    )
}


