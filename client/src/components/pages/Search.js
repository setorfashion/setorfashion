import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import M from 'materialize-css/dist/js/materialize'
import Loading from '../loader'
import { getAutoCompleteData } from '../scripts/autocomplete'
const axios = require('axios').default
const API = require('../../Api')

const SearchPage = () => {
    let el = document.querySelectorAll('.tabs');
    let tab = M.Tabs.init(el);

    async function search(evt){

    }

    return [
        <div className="search">
            <div className='search-content'>
                <div className="row">
                    <div className="input-container">
                        <div className="input-field">
                        <i className="material-icons prefix" style={{color:'gray', marginTop:'5px', marginLeft: '5px'}}>search</i>
                            <input autoComplete="off" autoFocus="on" onKeyUp={(e) => search(e)} placeholder='Pesquisar' id='search-input' type="text" />
                        </div>
                    </div>
                    <hr></hr>
                    <div className="col s12" style={{ position: 'fixed', marginBottom: '20px', maxWidth:'614px' }}>
                        <ul className="tabs">
                            <li className="tab col s3 tab-item"><a className="active" href="#lojas">Lojas</a></li>
                            <li className="tab col s3 tab-item"><a  href="#produtos">Produtos</a></li>
                            {/* <li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li> */}
                        </ul>
                    </div>
                    <div style={{ position: 'fixed', marginTop: '60px', width: '100%', minHeight: '100%' }}>
                        <div id="lojas" className="col s12">Test 1</div>
                        <div id="produtos" className="col s12">Test 2</div>
                    </div>
                </div>
            </div>
        </div>
    ]

}

export default SearchPage