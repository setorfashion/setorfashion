import React,{useState,useEffect} from 'react'
const Profile = ()=>{
    const [data,setData]=useState([])
    useEffect(()=>{
        const token = localStorage.getItem("jwt")
        fetch("/api/post/getmyposts",{
            headers:{
                "Content-Type":"application/json",
                "authorization": "Bearer "+token
            },
            method: "Get"
        }).then(res=>res.json()).then((result)=>{
            // console.log(result)
            setData(result)
        }).catch(err=>{
            console.log(err);
        })
    },[])
    return(
        <div style={{maxWidth:"550px", margin:"0px auto", paddingTop:"30px"}}>
            <div style={{display:"flex", justifyContent:"space-around", margin:"18px 0px", borderBottom:"1px solid gray"}}>
                <div>
                    <img className="imagemPerfil"
                    style={{width:'25vw',height:"25vw",borderRadius:"50vw",maxWidth:"160px",maxHeight:"160px", justifyContent:"space-around"}}                    
                    src="https://cdn.pixabay.com/photo/2015/12/19/21/03/person-1100286_960_720.jpg" />
                </div>
                <div>
                    <h4>User name</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h5>Infor 1</h5>
                        <h5>Infor 2</h5>
                        <h5>Infor 3</h5>
                    </div>
                </div>
            </div>
            <div className="galery">
            {
                    data.map(item=>{
                        return(
                            <img className='item' src={'/api/post/getpostimage/'+item.photo} />
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default Profile