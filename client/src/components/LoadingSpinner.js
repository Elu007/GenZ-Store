import React from 'react';
import styled from 'styled-components';

const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it appears on top of other content */
`;

const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingSpinner = () => (
  <SpinnerOverlay>
    <Spinner />
  </SpinnerOverlay>
);

export default LoadingSpinner;
