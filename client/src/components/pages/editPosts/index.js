import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Container, ConfigPostContainer,PaymentContainer, QrContainer, QrCode, BackDrop } from "./styled";
import { CardPost } from "../../posts/CardPost";
import Loading from "../../loading";
import { TOAST_ERROR } from "../../../classes";
import history from "../../../services/history";
import rocket from '../../images/rocket.ico'
import pixLogo from '../../images/pixlogo.png'
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
  const [showPayment, setShowPayment] = useState(false)
  const [qrCode, setQrCode] = useState('')
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

  function getQRCode() {
    setIsLoading(true)
    axios.get(`${API.AMBIENTE}/gn/gerarcobrancaimpulso`,{
      headers:{
      "authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
      }
    }).then((rs)=>{
      const data =  rs.data.qr.imagemQrcode
      setIsLoading(false)
      setQrCode(data)
      setShowPayment(true)
    }).catch(err=>{
      M.toast({ html: "Houve uma Falha ao processar sua solicitação, por favor tente novamente.", classes: TOAST_ERROR })
      console.log(err)
    })
  }

  function editCaption() {
    const caption = document.querySelectorAll('#input-caption')[0]
    const value = caption.value
    const data = {
      storeId,
      postId,
      captionValue: value
    }

    axios.post(`${API.AMBIENTE}/post/editpost`,data,{headers:{
      "authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
      }}).then((rs)=>{
        console.log(rs)
      }).catch(err=>{
        console.log(err)
      })

  }

  return(
    <Container>
      {showPayment?
      <>
        <BackDrop/>,
        <PaymentContainer>
          <label onClick={()=>setShowPayment(false)} className="close">x</label>
          <h5>Dados para Pagamento</h5>
          <div className="servicoInfor">
            <h6>Serviço</h6>
            <h6>Valor</h6>
          </div>
          <div className="servicoInfor">
            <label className="servicoDesc">
              Impulsionar Publicação x5 (dias)
            </label>
            <label className="valor">
              R$ 50.00
            </label>
          </div>
          <img src={pixLogo} style={{width:'150px', marginTop: '30px'}} />
          <QrContainer>
            <div className="qrImageCont">
              <QrCode src={qrCode}/>
            </div>
          </QrContainer>
          <label style={{color:'#32bcad'}}>Dados válidos para os próximos 30 minutos</label>
        </PaymentContainer>
      </>
      :''}
      <ConfigPostContainer >
        <div style={{width: '100%'}}>
          <h5>Editar Publicação</h5>
          <hr/>
        </div>
        <div onClick={()=>getQRCode()} className="configOptions">
          <img src={rocket} style={{ width: '35px'}} /><br/>
          <span>Impulsionar</span>
        </div>
        {/* <div className="configOptions">
          <i className="material-icons">visibility_off</i><br/>
          <span>Ocultar</span>
        </div>
        <div className="configOptions">
          <i className="material-icons">delete_forever</i><br/>
          <span>Excluir</span>
        </div> */}
        </ConfigPostContainer>
      <Loading isLoading={isLoading} />
      <CardPost data={postData} scrollToPost={false} hasEdit={true} saveEdit={editCaption} />
    </Container>
  )
}