import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  img{
    width: 40px;
    height: 40px;
  }
`;

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Button isVisible={isVisible} onClick={scrollToTop}>
      <img src='/images/totop.png' alt='top'/>
    </Button>
  );
};

export default BackToTopButton;
