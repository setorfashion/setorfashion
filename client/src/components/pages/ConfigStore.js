import React, { useState, useEffect,useContext} from 'react'
import {useHistory } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
import { useCookies } from 'react-cookie';

const COLORS = require('../../classes')
const API = require('../../Api')



const ConfigStore = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const [load, setLoad] = useState(true)
    const {state,dispatch} = useContext(UserContext)
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [listSetor, setListSetor] = useState([])
    const [setorColor, setSetorColor] = useState('')
    const [prevSetor,setprevSetor]=useState('')
    const [prevCategories,setPrevCategories]=useState([])    
    const [prevSubCategories,setSubPrevCategories]=useState([])
    const [storeName, setStoreName] = useState("")
    const [storeAddress, setStoreAddress] = useState("")
    const [storeNumber, setStoreNumber] = useState("")
    const [email, setEmail] = useState("")
    const [instagram, setInstagram] = useState("")
    const [whatsapp, setWhatsApp] = useState("")


    const token = cookies.jwt
    const store_id = cookies.store_id
    
    useEffect(() => {
        async function fetchStore(){
            return await fetch(API.AMBIENTE+'/store/getstorebyid',{
                method: "Post",
                headers: {
                    "Content-Type":"application/json",
                  },
                body:JSON.stringify({
                    id:store_id
                  })
            }).then(resp=>resp.json())
            .then((data)=>{
                setPrevCategories(data.categories)
                setSubPrevCategories(data.subcategories)
                const storedt = JSON.parse(JSON.stringify(data.dados))
                const address = JSON.parse(JSON.stringify(storedt.address))
                const setor = JSON.parse(JSON.stringify(storedt.setor))
                setprevSetor(setor._id)
                setStoreName(storedt.storeName)
                setStoreAddress(address.street)
                setStoreNumber(address.number)
                setEmail(storedt.email)
                setInstagram(storedt.instagram)
                setWhatsApp(storedt.whatsapp)
                setLoad(false)
            }).catch(err=>{
                console.log(err)
            })
        }
        if(store_id){
            fetchStore()
        }
        
    },[])
    useEffect(() => {
        async function getSetors(){
            await fetch(API.AMBIENTE+'/config/getallsetor', {
                headers:{
                    "authorization":"Bearer "+token
                },
                method: "Get"
            })
                .then(rs => rs.json())
                .then((result) => {
                    setListSetor(result)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        
        async function getAllCategories(){
            await fetch(API.AMBIENTE+'/config/getallcategories', {
                headers:{
                    "authorization":"Bearer "+token
                },
                method: "Get"
                })
                .then(rs => rs.json())
                .then((result) => {
                    const listCategories = new Array();
                    result.map(item => {
                        let nc = {
                            _id:item._id,
                            description:item.description,
                            checked:prevCategories.includes(item._id)
                            }
                        
                        listCategories.push(nc)
                    })
                    setCategories(listCategories) 
                })
                .catch(err => {
                    console.log(err)
                })
    
        }
        async function getAllSubCategories(){
            fetch(API.AMBIENTE+'/config/getallsubcategories', {
                headers:{
                    "authorization":"Bearer "+token
                },
                method: "Get"
            }).then(rs => rs.json()).then((result) => {
                    const listSubCategories = new Array();
                    result.map(item => {
                        let nc = {
                            _id:item._id,
                            description:item.description,
                            checked:prevSubCategories.includes(item._id)
                        }
                        listSubCategories.push(nc)
                    })
                    setSubCategories(listSubCategories)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        
        getSetors()
        getAllCategories()
        getAllSubCategories()
        
    },[prevCategories && prevSubCategories])

    const history = useHistory()

    const handleCategories = (e) => {
        let {checked: ischecked, id} = e.target
        categories.map((item,key)=>{
            if(item._id===id){
                    item.checked = ischecked
                    categories[key]=item                
            }
        })        
        var newcategories = categories
        setCategories(newcategories)             
    }

    const handleSubCategories = (e) => {
        let {checked: ischecked, id}=e.target
        subCategories.map((item,key)=>{
            if(item._id===id){
                    item.checked = ischecked
                    subCategories[key]=item                
            }
        })        
        var newsubcategories = subCategories
        setSubCategories(newsubcategories)  
    }

    const defaultCategoryChecked=(id)=>{
        var it = categories.find(i=>i._id===id)
        if(it){
            if(it.checked)
                return 'checked'
        }        
    }
    const defaultSubCategoryChecked=(id)=>{
        var it = subCategories.find(i=>i._id===id)
        if(it){
            if(it.checked)
                return 'checked'
        }        
    }
    const defaultSetor=(id)=>{
        var it = prevSetor===id
        if(it){
            return 'checked'
        }        
    }

    const setSettings = () => {
        let checkedCategories = [];
        let checkedSubCategories = [];

              

        categories.map(item => {
            if (item.checked) {
                checkedCategories.push(item._id)
            }
        })
        if (checkedCategories.length === 0) {
            M.toast({ html: "Você deve selecionar ao menos 1 Categoria", classes: COLORS.TOAST_ERROR });
            return false
        }
        subCategories.map(item => {
            if (item.checked) {
                checkedSubCategories.push(item._id)
            }
        })
        if (checkedSubCategories.length === 0) {
            M.toast({ html: "Você deve selecionar ao menos 1 Subcategoria", classes: COLORS.TOAST_ERROR });
            return false
        }

        if(!setorColor){
            M.toast({ html: "Você deve selecionar o setor da sua loja", classes: COLORS.TOAST_ERROR });
            return false
        }

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Informe um email válido", classes:COLORS.TOAST_ERROR})
            return false
          }

        if(!storeName || !storeNumber || !email ||  !whatsapp || !storeAddress){
            M.toast({ html: "Por favor, preencha todos os campos do formulário", classes: COLORS.TOAST_ERROR });
            return false
        } 
        console.log({
            storeName,
            street: storeAddress,
            number: storeNumber,
            whatsapp,
            instagram,
            email,
            setorId:setorColor,
            checkedSubCategories,
            checkedCategories
        })

        let url = ''
        let method =''
        if(store_id!==''){
            url = API.AMBIENTE+'/store/updatestore'
            method="PUT"
        }else{
            url = API.AMBIENTE+'/store/createstore'
            method="POST"
        }


        console.log(url+" "+method+ " "+token);

        fetch(url,{
            headers:{
                "authorization":"Bearer "+token,
                "Content-Type":"application/json",
            },
            method:method,
            body:JSON.stringify({
                storeName,
                street: storeAddress,
                number: storeNumber,
                whatsapp,
                instagram,
                email,
                setorId:setorColor,
                checkedSubCategories,
                checkedCategories,
                store_id:store_id
            })
        }).then(res=>res.json())
        .then((resp)=>{
            console.log(resp);
            if(!store_id){
                setCookie('store_id',resp.store_id,{ path: '/' })
                dispatch({type:"STORE",payload:"STORE"})
            }            
            M.toast({html:"Configurações Atualizadas!",classes:COLORS.TOAST_SUCCESS});
            setTimeout(() => {
                history.push('/profile?storeId='+resp.store_id);
              }, 100);
            
        }).catch(err=>{
            M.toast({html:"Tivemos uma falha por favor entre em contato com o suporte!",classes:COLORS.TOAST_ERROR});
        })

    }
    return (
        <div className="input-filed-config settings" style={{paddingTop: '50px'}}>
            <h4>
                Configurações
            </h4>
            <h5>
                (LOJA)
            </h5>
            <div className="input-field">
                <input id='nome'  onChange={(e) => setStoreName(e.target.value)} type="text" value={storeName}/>
                <label htmlFor="nome" >Nome da Loja</label>
            </div>
            <div className="input-field">
                <input id='endereco' onChange={(e) => setStoreAddress(e.target.value)} type="text" value={storeAddress}/>
                <label htmlFor="endereco">Endereço (Endereço no Setor)</label>
            </div>
            <div className="input-field">
                <input id='numero' min='0' onChange={(e) => setStoreNumber(e.target.value.replace(/[^\w\s]/gi, ''))} type="number" value={storeNumber} />
                <label htmlFor="numero">Número</label>
            </div>
            <div className="input-field">
                <input id='email' onChange={(e) => setEmail(e.target.value)} type="text" value={email} />
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
                <input id='instagram'  onChange={(e) => setInstagram(e.target.value.replace(/[^\w\s]/gi, ''))} type="text" value={instagram} />
                <label htmlFor="instagram">Instagram (Sem @)</label>
            </div>
            <div className="input-field">
                <input id='whatsapp' onChange={(e) => setWhatsApp(e.target.value)} type="text" value={whatsapp} />
                <label htmlFor="whatsapp">WhatsApp</label>
            </div>
            <h5>
                Escolha o Setor
            </h5>
            <div style={{ textAlign: "left" }}>
                {
                    listSetor.map((item,key) => {
                        return (
                            <div key={key} className="settings-setor" style={{ backgroundImage: "linear-gradient(to right, white, "+item.color+")" }}>
                                <label>
                                    <input  name="group1" defaultChecked={defaultSetor(item._id)}  onChange={(e) => setSetorColor(item._id)} id={item._id}  type="radio" />
                                    <span style={{ color: "black", fontWeight: "bold", fontSize: '20px' }}>{item.description}</span>
                                </label>
                            </div>
                        )
                    })
                }

            </div>
            <div style={{ marginTop: "30px" }}>
                <h5>
                    Escolha a Categoria
                </h5>
                <div className="row" style={{ textAlign: "left" }}>
                    {
                        categories.map((item, key) => {
                            return (
                                <div key={key} className="col s6">
                                    <label>
                                        <input  type="checkbox"  id={item._id} onClick={(e) => handleCategories(e)}  defaultChecked={defaultCategoryChecked(item._id)} />
                                        <span>{item.description}</span>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div style={{ marginTop: "30px" }}>
                <h5>
                    Escolha a Subcategoria
                </h5>
                <div className="row" style={{ textAlign: "left" }}>
                    {
                        subCategories.map((item,key) => {
                            return (
                                <div key={key} className="col s6">
                                    <label>
                                        <input type="checkbox" id={item._id} onClick={(e) => handleSubCategories(e)} defaultChecked={defaultSubCategoryChecked(item._id)} />
                                        <span>{item.description}</span>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <button onClick={() => setSettings()} className="btn waves-effect waves-light #64b5f6 blue dark-1">Enviar</button>
        </div>
    )
}

export default ConfigStore;