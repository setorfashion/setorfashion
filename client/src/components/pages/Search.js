import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize'
import semFoto from "../images/sem-foto.jpg"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from '../loader'
import { getAutoCompletePosts, getAutoCompleteStores } from '../scripts/autocomplete'
const axios = require('axios').default
const API = require('../../Api')

const SearchPage = () => {
    const [stores, setStores] = useState([])
    // const [isLoaded,setLoaded]=useState(false)
    let selectedTab = ''
    useEffect(() => {
        console.log(stores.length)
        console.log(stores)
        let el = document.querySelectorAll('.tabs');
        let tab = M.Tabs.init(el);
    }, [])

    function setTab(value) {
        selectedTab = value;
    }

    function Search(value) {
        const inputValue = value.target.value
        if (selectedTab === 'STORE') {
            const promise = [getAutoCompleteStores(inputValue)]
            Promise.all(promise).then((rs) => {
                console.log(rs[0])
                console.log(promise)
                setStores(rs[0])
                console.log(stores)

            })

            // setStores([0={'a':}])
        }
    }

    function renderConteudo() {
        return (
            stores.map((item, key) => {
                return (
                    <div className="div-store" style={{ backgroundImage: 'linear-gradient(to top, white 90%, ' + item.setor.color + ' 80%)' }}>
                        <div className='circle-g-new' style={{ background: "linear-gradient(white, white) padding-box, linear-gradient(to right, " + item.setor.color + " 0%, " + item.setor.color + " 100%) border-box" }}>
                            <LazyLoadImage className='img-circle' style={{ width: '49px', height: '49px'}} src={semFoto} />
                        </div>
                        <div>
                            <h5>{item.storeName}</h5>
                        
                            <span style={{ fontSize: '14px' }}>
                                {item.address.street + ', ' + item.address.number}
                            </span>
                        </div>
                    </div>
                )
            })
        )

    }

    return [
        <div className="search-content">
            <div className='search'>
                <div className="row">
                    <div className="input-container">
                        <div className="input-field">
                            <i className="material-icons prefix" style={{ color: 'gray', marginTop: '5px', marginLeft: '5px' }}>search</i>
                            <input autoComplete="off" onKeyUp={(e) => Search(e)} placeholder='Pesquisar' id='search-input' type="text" />
                        </div>
                    </div>
                    <hr></hr>
                    <div className="col s12" style={{ marginBottom: '20px', maxWidth: '614px', width: '100%' }}>
                        <ul className="tabs">
                            <li className="tab col s4 tab-item"><a href="#stores">Lojas</a></li>
                            <li className="tab col s4 tab-item"><a href="#products">Produtos</a></li>
                            <li className="tab col s4 tab-item"><a href="#categories">Categorias</a></li>
                        </ul>
                    </div>

                    <div className="content-results " id="stores">
                        {setTab('STORE')}
                        {renderConteudo()}
                    </div>
                    <div className="content-results " id="products">Test 2</div>
                    <div className="content-results " id="categories">Categorias</div>

                </div>
            </div>
        </div>
    ]

}

export default SearchPage