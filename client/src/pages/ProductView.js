import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
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
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        {/* Add more product details as needed */}
      </ProductInfo>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
`;

const Image = styled.div`
  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  padding-left: 20px;
`;

export default ProductView;
