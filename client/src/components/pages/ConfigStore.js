import React, { useState, useEffect } from 'react'
import {useHistory } from 'react-router-dom'
import M from 'materialize-css'
const COLORS = require('../../classes')
const API = require('../../Api')

const ConfigStore = () => {

    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedSubCategories, setSelectedSubCategories] = useState([])
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


    const token = localStorage.getItem('jwt')
    const store_id = localStorage.getItem('store_id')
    
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
            }).catch(err=>{
                console.log(err)
            })
        }
        fetchStore()
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

    var imagemPostada = ""
    const history = useHistory()

    const handleCategories = (e) => {
        let ischecked=(e.target.checked)
        let id = e.target.id
        categories.map((item,key)=>{
            if(item._id==id){
                    item.checked = ischecked
                    categories[key]=item
                
            }
        })        
        var newcategories = categories
        setCategories(newcategories)             
    }

    const handleSubCategories = (e) => {
        let ischecked=(e.target.checked)
        let id = e.target.id
        subCategories.map((item,key)=>{
            if(item._id==id){
                    item.checked = ischecked
                    subCategories[key]=item
                
            }
        })        
        var newsubcategories = subCategories
        setSubCategories(newsubcategories)  
    }

    const defaultCategoryChecked=(id)=>{
        var it = categories.find(i=>i._id==id)
        if(it){
            if(it.checked)
                return 'checked'
        }        
    }
    const defaultSubCategoryChecked=(id)=>{
        var it = subCategories.find(i=>i._id==id)
        if(it){
            if(it.checked)
                return 'checked'
        }        
    }
    const defaultSetor=(id)=>{
        var it = prevSetor==id
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
        if (checkedCategories.length == 0) {
            M.toast({ html: "Você deve selecionar ao menos 1 Categoria", classes: COLORS.TOAST_ERROR });
            return false
        }
        subCategories.map(item => {
            if (item.checked) {
                checkedSubCategories.push(item._id)
            }
        })
        if (checkedSubCategories.length == 0) {
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

        // storeName,street,number,whatsapp,instagram,email,setorId
        let url = ''
        let method =''
        if(store_id!=''){
            url = API.AMBIENTE+'/store/updatestore'
            method="PUT"
        }else{
            url = API.AMBIENTE+'/config/createstore'
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
                localStorage.setItem("store_id",resp.store_id)
            }            
            M.toast({html:"Configurações Atualizadas!",classes:COLORS.TOAST_SUCCESS});
            setTimeout(() => {
                history.push('/profile');
              }, 500);
            
        }).catch(err=>{
            M.toast({html:"Tivemos uma falha por favor entre em contato com o suporte!",classes:COLORS.TOAST_ERROR});
        })

    }

    return (
        <div className="input-filed-config settings">
            <h2>
                Configurações
            </h2>
            <h5>
                da sua loja
            </h5>
            <input onChange={(e) => setStoreName(e.target.value)} type="text" value={storeName} placeholder="Nome da sua Loja" />
            <input onChange={(e) => setStoreAddress(e.target.value)} type="text" value={storeAddress} placeholder="Endereço (Endereço no Setor)" />
            <input onChange={(e) => setStoreNumber(e.target.value)} type="number" value={storeNumber} placeholder="Número (Número da loja)" />
            <input onChange={(e) => setEmail(e.target.value)} type="text" value={email} placeholder="Email" />
            <input onChange={(e) => setInstagram(e.target.value)} type="text" value={instagram} placeholder="Instagram" />
            <input onChange={(e) => setWhatsApp(e.target.value)} type="text" value={whatsapp} placeholder="WhatsApp" />
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