import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';

const NavbarContainer = styled.nav`
  display: flex;
  height: 5vh;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;

  &.sticky {
    background-color: #333; /* Sticky background color */
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2); /* Add a shadow for visual effect */
  }

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
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      // eslint-disable-next-line
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <NavbarContainer className={isSticky ? 'navbar sticky' : 'navbar'} isSticky={isSticky}>
      <Link to={"/"}><Logo src="/images/storelogo.svg" alt="logo"/></Link>
      {/* Here I will add the user name and greetings */}
      <Utils>
        <Link to={"/login"}><Button>Login</Button></Link>
        <Link to={"/cart"}><Button><img src="/images/cart.png" alt="cart" /> {basket.length}</Button></Link>
      </Utils>
    </NavbarContainer>
  );
};

export default Navbar;
