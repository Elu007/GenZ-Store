import React, { useState } from 'react';
import styled from 'styled-components';

const HamburgerIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isopen }) => (isopen === 'true' ? '0' : '-300px')}; /* Use isopen as a string */
  width: 300px;
  height: 100%;
  background-color: #333;
  transition: right 0.3s ease-in-out;
`;

const MobileMenuContent = styled.div`
  padding: 2rem;
  color: white;
`;

const HamburgerMenu = () => {
  const [isopen, setisopen] = useState(false);

  const toggleMenu = () => {
    setisopen(!isopen);
  };

  return (
    <>
      <HamburgerIcon
        src="/images/hamburger.png"
        alt="menu"
        onClick={toggleMenu}
      />
      <MobileMenuContainer isopen={isopen.toString()}>
        <MobileMenuContent>
          {/* ... (menu links, filters, etc.) */}
          <button onClick={toggleMenu}>
            <img src='/images/close.png' alt='close'/>
          </button>
        </MobileMenuContent>
      </MobileMenuContainer>
    </>
  );
};

export default HamburgerMenu;
