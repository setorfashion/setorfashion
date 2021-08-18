import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const {TOAST_ERROR,TOAST_SUCCESS} = require('../../classes')
const API = require('../../Api')

const CreatePost = () => {

    var imagePathBucket="";
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [image,setImage] = useState("")
    var imagemPostada = ""
    const history = useHistory()
    // dbml8og1b
    const criarPostagem = ()=>{
        const data = new FormData()
        data.append('image',image)
        data.append('title',title)
        data.append('body',content)

        const token = localStorage.getItem('jwt');
        console.log(token);
        fetch(API.AMBIENTE+"/post/createpost",{
            method: "Post",
            headers:{
                "authorization":"Bearer "+token
            },
            body:data,
        }).then(res=>res.json())
        .then((result)=>{
            console.log(result)
            M.toast({html:"Post Criado com sucesso",classes:TOAST_SUCCESS})
            setTimeout(() => {
                history.push('/');
            }, 1000);
        }).catch(err=>{
            M.toast({html:"Falha ao criar sua postagem",classes:TOAST_ERROR})
            console.log(err);
        })
    }

    return(
        <div className="card input-filed">
            <h2>
                Nova Postagem
            </h2>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" hidden placeholder="Título"/>
            <div className="input-field">
                <input id='content' onChange={(e)=>setContent(e.target.value)} type="text"/>
                <label htmlFor="content" >Descrição</label>
            </div>
            

            <div className="file-field input-field">
                <div className="btn waves-effect waves-light #64b5f6 blue dark-1">
                    <span>Imagem</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button onClick={()=>criarPostagem()} className="btn waves-effect waves-light #64b5f6 blue dark-1">
                Publicar
            </button>
        </div>
    )
}

export default CreatePost;