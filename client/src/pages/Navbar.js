import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HamburgerMenu from '../components/HamburgerMenu';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Logo = styled.img`
    width: 50px;
    height: auto;
    margin-left: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 55%;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  @media (max-width: 768px) {
  margin-bottom: 0.7rem;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  margin-left: 0.3rem;
`;

const SearchIcon = styled.img`
  width: 25px;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
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
      <SearchContainer>
        <SearchIcon src="/images/search.png" alt="searchIcon"/>
        <SearchInput type="text" placeholder="Search..." />
      </SearchContainer>
      <Utils>
        <Link to={"/login"}><Button>Login</Button></Link>
        <Link to={"/cart"}><Button>Cart</Button></Link>
        <HamburgerMenu/>
      </Utils>
    </NavbarContainer>
  );
};

export default Navbar;
