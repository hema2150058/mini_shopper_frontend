import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import { faCartShopping, faEye, } from '@fortawesome/free-solid-svg-icons';
import { faUser, } from '@fortawesome/free-regular-svg-icons';

import { NavLink , useLocation} from "react-router-dom";
import { useNavigate } from "react-router";
 
import './CustomerNavHeader.css';

const CustomerNavHeader = ({cartSize=0}) => {

  console.log(cartSize);
  //let cartSize1 = cartSize();
  const navigate = useNavigate();
  const currentLocation = useLocation().pathname;
  console.log(currentLocation);
  const handleCart =() => {
    navigate('/cart');
  }
  const handleLogout = () => {
        localStorage.clear();
        
        navigate('/login');
        window.location.reload();
        console.log('logout clicked');
    }
  


  return (
    <Navbar expand="lg" className="nav-container" fixed='top'>
      <Container>
        <img href="/products" className='nav-header-logo' src={require('../../assets/Nav-header-logo.png')}></img>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant='underline' className="header-menu">
            <Nav.Link href="/products"> Home </Nav.Link>
            <Nav.Link className='header-menu-item' href="/products">Products</Nav.Link>
            <Nav.Link className='header-menu-item' href="/purchaseHistory">History</Nav.Link>
            {/* <NavDropdown className='header-menu-item' title="Actions">
              <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
              <NavDropdown.Item href="/purchaseHistory">
                Purchase History
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse >
        { currentLocation==='/products' ? 
        (
        <div className='cart-icon' onClick={handleCart}> 
        <FontAwesomeIcon size='lg' icon={faCartShopping} />&nbsp;{cartSize}
        </div>
        ): <div></div>}

      </Container>
      <NavDropdown className='profile-dropdown' title={
          <FontAwesomeIcon color='#FF786CFF' icon={faUser} />
        }>
          <NavDropdown.Item className='profile-drop-tem '  href="userprofile">User Profile</NavDropdown.Item>
              <NavDropdown.Item className='profile-drop-tem'  onClick={handleLogout}>Logout</NavDropdown.Item>        
        </NavDropdown>

    </Navbar>
  );
}

export default CustomerNavHeader;