import React,{ useState} from 'react'
import { Link, useHistory } from 'react-router-dom'


const BottomBar = () => {

  const renderList = () => {

    return [
      <div key="modalSearch" id="modalSearch" className="modal bottom-sheet">


      </div>,
      <div key="home" style={{ display: 'inline-block' }}>
        <Link to={'/'} ><i className="material-icons icons-footer" style={{ fontSize: "30px", color: 'red !important' }}>home</i></Link>
      </div>,
      <div key='search' style={{ display: 'inline-block' }}>
         <Link to={'/search'} ><i className="material-icons icons-footer" style={{ fontSize: "30px", color: 'red !important' }}>search</i></Link>
      </div>,
      <div key='info' style={{ display: 'inline-block' }}>
        <Link to={'/'} ><i className="material-icons icons-footer" style={{ fontSize: "30px", color: 'red !important' }}>info</i></Link>
      </div>
    ]

  }
  return (
    <footer id="footer" className="footer">
      <div style={{ color: 'white', justifyContent: 'space-around', paddingTop: '3px', width: '100%', flexWrap: 'wrap', display: 'flex' }}>
        {renderList()}
      </div>
    </footer>
  );
}

export default BottomBar;
