import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Container, ConfigPostContainer } from "./styled";
import { CardPost } from "../../posts/CardPost";
import Loading from "../../loading";
import { TOAST_ERROR } from "../../../classes";
import history from "../../../services/history";
import rocket from '../../images/rocket.ico'
import API from '../../../Api'
import M from "materialize-css";

const axios = require('axios').default

export default function EditPost(){

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const postId = query.get("postid");
  const {storeId, token} = useSelector(state=>state.auth)
  const [postData,setPostData]= useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    axios.post(`${API.AMBIENTE}/post/getstorepostbyid`,{
      storeId,
      postId,
      },
    {
      headers:{
      "authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
      }
    }).then(result=>{
      setPostData(result.data.posts)
      console.log(result.data.posts)
      setIsLoading(false)
    }).catch(err=>{
      M.toast({ html: "Houve Falha ao carregar os dados da publicação, por favor tente novamente ou logue novamente.", classes: TOAST_ERROR })
      history.goBack()
    })
  },[])

  return(
    <Container>
      <ConfigPostContainer >
        <div style={{width: '100%'}}>
          <h5>Editar Publicação</h5>
          <hr/>
        </div>
        <div className="configOptions">
          <img src={rocket} style={{ width: '35px'}} /><br/>
          <span>Impulsionar</span>
        </div>
        <div className="configOptions">
          <i className="material-icons">visibility_off</i><br/>
          <span>Ocultar</span>
        </div>
        <div className="configOptions">
          <i className="material-icons">delete_forever</i><br/>
          <span>Excluir</span>
        </div>
        </ConfigPostContainer>
      <Loading isLoading={isLoading} />
      <CardPost data={postData} scrollToPost={false} hasEdit={true} />
    </Container>
  )
}