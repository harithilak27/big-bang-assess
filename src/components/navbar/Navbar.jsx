import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';
function Navbar() { 
    
    
  const logout = () =>{
        localStorage.removeItem("user")
        window.location.reload()
    }

  return (
    <div>
      <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
        <span className="logo">Hospital</span>
        </Link>  
        <div>
          <button className="navButton" onClick={logout}>logout</button>
        </div> 
        <div className="navItems">
        <Link to='/Register'>
            <button className="navButton">Register</button>
        </Link>
        <Link to="/login">
            <button className="navButton">Login</button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
