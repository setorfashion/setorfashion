import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const {TOAST_ERROR,TOAST_SUCCESS} = require('../../classes')


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
        fetch("/post/createpost",{
            method: "Post",
            headers:{
                "authorization":"Bearer "+token
            },
            body:data,
        }).then(res=>res.json())
        .then(result=>{
            M.toast({html:"Post Criado com sucesso",classes:TOAST_SUCCESS})
            setTimeout(() => {
                history.push('/');
            }, 1000);
        }).catch(err=>{
            M.toast({html:"Falha ao criar sua postagem",classes:TOAST_ERROR})
            console.log(err);
        })
    }

    const criarPostagem_ = ()=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset',"setorfashion-dev")
        data.append('cloud_name',"dbml8og1b")
        fetch("https://api.cloudinary.com/v1_1/dbml8og1b/image/upload",{
            method: "Post",
            body:data,
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
        <div className="card input-filed">
            <h2>
                Nova Postagem
            </h2>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Título"/>
            <input onChange={(e)=>setContent(e.target.value)} type="text" placeholder="Content"/>

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
                Postar
            </button>
        </div>
    )
}

export default CreatePost;