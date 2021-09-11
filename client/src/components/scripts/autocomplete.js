const axios = require('axios').default
const API = require('../../Api')

export function getAutoCompleteStores (inputValue){
    return new Promise(async (resolve,reject)=>{
        let value  = inputValue.toLowerCase()
        if(value!==''){
            await axios.post(API.AMBIENTE + "/search/autocompletestores",{value})
            .then((result)=>{
                console.log(result.data)
                resolve(result.data)
            }).catch(err=>{
                console.log(err)
                return reject ()
            })
        }
        return reject(false)        
    })    
}
export function getAutoCompleteStuff (inputValue){
    return new Promise(async (resolve,reject)=>{
        let value  = inputValue.toLowerCase()
        if(value!==''){
            await axios.post(API.AMBIENTE + "/search/autocompletestuff",{value})
            .then((result)=>{
                resolve(result.data)
            }).catch(err=>{
                console.log(err)
                return reject ()
            })
        }
        return reject(false)        
    })    
}

export function getAutoCompletePosts (evt){
    return new Promise(async (resolve,reject)=>{
        let value = evt.target.value
        value = value.toLowerCase()
        await axios.post(API.AMBIENTE + "/search/autocompleteposts",{value})
        .then((result)=>{
            console.log(result)
            resolve(result.data)
        }).catch(err=>{
            reject ()
        })
    })
    
}