import React,{useEffect, useState} from "react";
import { Navbar, Nav, Container, NavDropdown, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
 import {  useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import {logout} from "../actions/userActions.js";

const Header = () => {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo} = userLogin;
  

 
   
 
  //console.log(userInfo)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutHandler()
  {
    dispatch(logout());
    navigate("/");

  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>Joshi's</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>


              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'> 
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ): <LinkContainer to={"/login"}>
                <Nav.Link>
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              </LinkContainer>
            }
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
