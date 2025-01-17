import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../App.css';

const Nav = () => {
  const auth = localStorage.getItem('users');
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.clear();
    navigate('/signup');
  }
  return (
    <div className="nav-container">
      {auth ? 
      <ul className="nav-ul">
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name}) </Link></li>
        </ul> :

         <ul className="nav-ul">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          </ul> 
          }
    </div>
  );
};

export default Nav;
