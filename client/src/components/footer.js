import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

const BottomBar = () => {

  function searchModal(params) {



  }
  const renderList = () => {

    return [
      <div id="modalSearch" className="modal bottom-sheet">
        <div className="modal-content">
          <div className="input-field">
            <input autoComplete="off" id='search' type="text" />
            <label style={{fontSize:"18px", marginBottom: "20px"}} htmlFor="search">O que você procura?</label>
          </div>
          <div style={{textAlign:'right'}}>
            <a href="#!" className="modal-close waves-effect waves-green btn-search btn-flat">buscar</a>
          </div>
        </div>

      </div>,
      <div key="home" style={{ display: 'inline-block' }}>
        <Link to={'/'} ><i className="material-icons icons-footer" style={{ fontSize: "30px", color: 'red !important' }}>home</i></Link>
      </div>,
      <div key='search' style={{ display: 'inline-block' }}>
        <a className="waves-effect waves-light modal-trigger" href="#modalSearch"><i className="material-icons icons-footer" style={{ fontSize: "30px", color: 'red !important' }}>search</i></a>
      </div>,
      <div key='info' style={{ display: 'inline-block' }}>
        <Link to={'/'} ><i className="material-icons icons-footer" style={{ fontSize: "30px", color: 'red !important' }}>info</i></Link>
      </div>
    ]

  }
  return (
    <footer className="footer">
      <div style={{ color: 'white', justifyContent: 'space-around', paddingTop: '3px', width: '100%', flexWrap: 'wrap', display: 'flex' }}>
        {renderList()}
      </div>
    </footer>
  );
}

export default BottomBar;
