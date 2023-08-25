import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  width: 30vw;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.div`
  margin-bottom: 0.9rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
`;

const CardButton = styled.button`
    margin-left: 1rem;
    margin-right: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  @media (max-width: 768px) {
     margin: 0.1rem 0;
     padding: 0.2rem 0.2rem;
    }
`;

const Card = ({ imageUrl, title, description }) => {
    return (
        <CardWrapper>
            <CardImage src={imageUrl} alt={title} />
            <CardContent>
                <CardTitle>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </CardTitle>
                <CardButton>View Details</CardButton>
                <CardButton>Add to Cart</CardButton>
            </CardContent>
        </CardWrapper>
    );
};

export default Card;
