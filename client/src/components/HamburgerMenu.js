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

const CategoryButtons = styled.div`
  margin-bottom: 10px;
  button{
  display: flex;
  flex-direction: column;
  padding: 9px;
  margin-top: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  @media (max-width: 768px) {
     margin: 0.1rem 0;
     padding: 0.2rem 0.2rem;
    }
  }
`;

const HamburgerMenu = ({ onCategorySelect, onAllProductsClick  }) => {
  const [isopen, setisopen] = useState(false);

  const toggleMenu = () => {
    setisopen(!isopen);
  };

  const handleCategorySelect = (category) => {
    setisopen(false); // Close the menu when a category is selected
    onCategorySelect(category);
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
          <CategoryButtons>
          <button onClick={() => handleCategorySelect('Electronics')}>Electronics</button>
            <button onClick={() => handleCategorySelect('Clothes')}>Clothes</button>
            <button onClick={() => handleCategorySelect('Beauty')}>Beauty</button>
            <button onClick={() => handleCategorySelect('Bags')}>Bags</button>
            <button onClick={onAllProductsClick}>All Products</button>
          </CategoryButtons>
          <button onClick={toggleMenu}>
            <img src='/images/close.png' alt='close' />
          </button>
        </MobileMenuContent>
      </MobileMenuContainer>
    </>
  );
};

export default HamburgerMenu;
