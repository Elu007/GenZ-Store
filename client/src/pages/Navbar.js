import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  height: 5vh;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const Logo = styled.img`
    width: 50px;
    height: auto;
    margin-left: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
  margin-right: 1rem;
`;
const Utils = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Navbar = () => {

  return (
    <NavbarContainer>
      <Link to={"/"}><Logo src="/images/storelogo.svg" alt="logo"/></Link>
      {/* Here I will add the user name and greetings */}
      <Utils>
        <Link to={"/login"}><Button>Login</Button></Link>
        <Link to={"/cart"}><Button>Cart</Button></Link>
      </Utils>
    </NavbarContainer>
  );
};

export default Navbar;
