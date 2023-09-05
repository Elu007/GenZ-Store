import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Rating } from '@mui/material'
import LoadingSpinner from '../components/LoadingSpinner';

const ProductView = () => {
  const { id } = useParams(); // Get the productId from the URL
  console.log(id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  const fetchProduct = async () => {
    try {
      const productId = id;
      const response = await axios.get(`/api/products/get/${productId}`);
      setProduct(response.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />; // Render the loading spinner while data is loading
  }

  return (
    <Container>
      <Image>
        <img src={product.imageUrl} alt={product.title} />
      </Image>
      <ProductInfo>
        <h1>{product.title}</h1>
        <Description>
          <h3>Description:</h3>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <h2>Price: ₹{product.price}</h2>
          <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
        </Description>
        <Button>Buy Now</Button>
        <Button>Add to Cart</Button>
      </ProductInfo>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column; /* Column layout */

  @media (min-width: 768px) {
    flex-direction: row; /* Row layout for screens wider than 768px */
  }
`;

const Image = styled.div`
  flex: 1;
  padding: 15px;

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  margin-top: 4vh;
  padding: 20px;
  text-align: center; /* Center text horizontally */

  @media (min-width: 768px) {
    text-align: left; /* Align text to the left for screens wider than 768px */
  }
`;
const Description = styled.div`
  margin-top: 6vh;
  h2{
    margin-top: 3vh;
  }
`;
const Button = styled.button`
 margin-top: 1rem;
  margin-right: .5rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ProductView;
