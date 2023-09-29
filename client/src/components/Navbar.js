import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const NavbarContainer = styled.nav`
  display: flex;
  height: 5vh;
  color: white;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
  position: sticky;
  top: 0; /* Stick to the top of the viewport */
  width: 100%;
  z-index: 100;

  background-color: #333;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2); /* Add a shadow for visual effect */

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    h4 {
      margin-bottom: 5px;
      word-wrap: break-word;
    }
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
  img{
    height: 16px;
    width: 23px;
  }
`;
const Utils = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Navbar = () => {
  const [{ basket }, dispatch] = useStateValue();
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  // const [issticky, setissticky] = useState(false);

  const userNameShow = async () => {
    try {
      const response = await axios.get('/getdata', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setUserName(data.name);
        setShow(true);
      } else {
        const error = new Error('Request failed');
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await axios.get('/logout', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials to send cookies
      });

      if (response.status === 200) {
        dispatch({ type: 'USER', payload: false });
        toast.success('Successfully logged out 😓!')
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      } else {
        const error = new Error(response.statusText);
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    userNameShow();
  }, []);


  return (
    <NavbarContainer>
      <Link to={"/"}><Logo src="/images/storelogo.svg" alt="logo" /></Link>
      {/* Here I will add the user name and greetings */}
      <h4>Welcome {userName} {show ? ', happy to see you back at our GenZ store' : ', we are the GenZ shoppers'}</h4>
      <Utils>
        {userName ? (
          <>
            <Button onClick={handleLogout}>Logout</Button>
            <Link to={"/cart"}><Button><img src="/images/cart.png" alt="cart" />{basket?.length || 0}</Button></Link>
          </>
        ) : (
          <Link to={"/signup"}>
            <Button>SignUp/Login</Button>
          </Link>
        )}
      </Utils>
    </NavbarContainer>
  );
};

export default Navbar;
