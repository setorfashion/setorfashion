import React from 'react'
import {useParams, useLocation} from "react-router-dom"
const API = require('../../Api')

const Token = ()=>{
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    let query = useQuery();
    const authCode = query.get("code");
    const Auth = query.get("authorization_code");
    const jwt = localStorage.getItem('jwt')
   
    fetch(API.AMBIENTE+'/token',{
        method: 'post',
        headers:{
            "authorization": "Bearer "+jwt,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "authCode":authCode 
        })
        
    }).then(res=>res.json()).then((result)=>{
        console.log(result)
        loadInstagramData()
    }).catch(err=>{
        console.log(err)
    })

    const loadInstagramData = () =>{
        console.log('chamou load data')
        fetch(API.AMBIENTE+'/token/getInstagramData',{
            method: 'get',
            headers:{
                "authorization": "Bearer "+jwt,
            }            
        }).then(res=>res.json()).then((result)=>{
            console.log(result)
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <div>
            <br></br>
            <h1>TOKEN</h1>
            {'Codigo: '+authCode}
            {'Authorization: '+Auth}
        </div>
    )
}


export default Token