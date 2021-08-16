import React from 'react'
import {useParams} from "react-router-dom"

const Token = ()=>{
    const params = useParams()
    var instaCod = '';
    console.log(params)
    if(params){
        instaCod = params.code
    }

    return (
        <div>
            {'Codigo: '+instaCod}
        </div>
    )
}


export default Token