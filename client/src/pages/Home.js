import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import Card from '../components/Card';
import HamburgerMenu from '../components/HamburgerMenu';

const baseURL = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [selectedCategory]); // Fetch products when the selectedCategory changes


  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/products/get`, {
        params: {
          category: selectedCategory,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/products/get`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Container>
        <Content>
          <Image>
            <img src="/images/banner.jpg" alt="bannerimage" />
          </Image>
          <SearchDiv>
            <SearchContainer>
              <SearchIcon src="/images/search.png" alt="searchIcon" />
              <SearchInput type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
            </SearchContainer>
            <HamburgerMenu onCategorySelect={handleCategorySelect} onAllProductsClick={fetchAllProducts}/>
          </SearchDiv>
          <CardContainer>
            {products?.filter((product) =>{
              return search.toLowerCase() === '' ? product : product.title.toLowerCase().includes(search); 
            }).map((product) => (
              <Card
                key={product._id}
                imageUrl={product.imageUrl}
                title={product.title}
                // We have to pass the ID as product._id otherwise it won't work
                id={product._id}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </CardContainer>
        </Content>
      </Container>
    </>
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

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const SearchContainer = styled.div`
  display: flex;
  margin-right: 20vw;
  width: 50%;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  @media (max-width: 768px) {
  margin-bottom: 0.7rem;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  margin-left: 0.3rem;
`;

const SearchIcon = styled.img`
  width: 25px;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
`;

const Content = styled.div`
  flex: 2;
`;

const Image = styled.div`
  img {
    width: 100%;
    height: 50vh;
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
