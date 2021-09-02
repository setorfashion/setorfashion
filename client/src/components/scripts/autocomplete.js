const axios = require('axios').default
const API = require('../../Api')

export function getAutoCompleteData (evt){
    return new Promise(async (resolve,reject)=>{
        let value = evt.target.value
        value = value.toLowerCase()
        await axios.post(API.AMBIENTE + "/search/autocomplete",{value})
        .then((result)=>{
            console.log(result)
            resolve(result.data)
        }).catch(err=>{
            reject ()
        })
    })
    
}