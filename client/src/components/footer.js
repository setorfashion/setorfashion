import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
const BottomBar = () => {
  const renderList = () => {
      
        return [
          <div style={{display:'inline-block'}}>
            <Link to={'/'} ><i className="material-icons icons-footer" style={{ fontSize: "30px", color: 'red !important'  }}>home</i></Link>
          </div>,
          <div style={{display:'inline-block'}}>
            <Link to={'/'} ><i className="material-icons icons-footer" style={{ fontSize: "30px", color: 'red !important' }}>search</i></Link>
          </div>,
          <div style={{display:'inline-block'}}>
            <Link to={'/'} ><i className="material-icons icons-footer" style={{ fontSize: "30px", color: 'red !important' }}>info</i></Link>
          </div>
        ]
      
  }
  return (
    <footer class="footer">
      <div style={{ color: 'white', justifyContent: 'space-around', paddingTop: '3px', width:'100%',flexWrap:'wrap', display:'flex' }}>
        {renderList()}
      </div>
    </footer>
  );
}

export default BottomBar;
