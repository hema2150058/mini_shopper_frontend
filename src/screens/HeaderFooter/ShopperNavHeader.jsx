import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import { faCartShopping, faEye, } from '@fortawesome/free-solid-svg-icons';
import { faUser, } from '@fortawesome/free-regular-svg-icons';

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

import './CustomerNavHeader.css';

const ShopperNavHeader = () => {

    const navigate = useNavigate();
    const handleCart = () => {
        navigate('/cart');
    }
    const handleLogout = () => {
        localStorage.clear();
        
        navigate('/');
        window.location.reload();
    }


    return (
        <Navbar expand="lg" className="nav-container" fixed='top'>
            <Container>
                <img href="/products" className='nav-header-logo' src={require('../../assets/Nav-header-logo.png')}></img>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant='underline' className="header-menu">
                        <Nav.Link href="/pendingOrders"> Home </Nav.Link>
                        <Nav.Link className='header-menu-item' href="/shopperInventory">Products</Nav.Link>
                        <NavDropdown className='header-menu-item' title="Actions">
                            <NavDropdown.Item href="/pendingOrders">Pending Orders</NavDropdown.Item>
                            <NavDropdown.Item href="/allOrders">
                               All Orders
                            </NavDropdown.Item>
                            <NavDropdown.Item href="allCustomers">Customer Details</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                {/* <div className='cart-icon' onClick={handleCart}>
                    <FontAwesomeIcon size='lg' icon={faCartShopping} />
                </div> */}


            </Container>
            <NavDropdown className='profile-dropdown' title={
                <><span style={{color:'#FF786CFF', marginRight: '5px'}} className='user-p'>User</span><FontAwesomeIcon color='#FF786CFF' icon={faUser} /></>
            }>
                <NavDropdown.Item className='profile-drop-tem ' href="/userprofile">User Profile</NavDropdown.Item>
                <NavDropdown.Item className='profile-drop-tem' onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>

        </Navbar>
    );
}

export default ShopperNavHeader;