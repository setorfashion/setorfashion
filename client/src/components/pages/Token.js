import React from 'react'
import {useParams} from "react-router-dom"

const Token = ()=>{
    const {code} = useParams()
    var instaCod = '';
    console.log(code)
    if(code){
        instaCod = code
    }

    return (
        <div>
            {'Codigo: '+instaCod}
        </div>
    )
}


export default Token