import React from 'react'
import { useState,useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import Card from '../components/Card';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products/get');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Container>
      <Content>
        <Image>
          <img src="/images/banner.jpg" alt="bannerimage" />
        </Image>
        <CardContainer>
        {products?.map((product) => (
          <Card
            key={product._id}
            imageUrl={product.imageUrl}
            title={product.title}
            // We have to pass the ID as product._id otherwise it won't work
            id={product._id}
          />
        ))}
        </CardContainer>
      </Content>
    </Container>
  )
}


const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 2;
`;

const Image = styled.div`
  img {
    width: 100%;
    height: 60vh;
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
    }
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Home
