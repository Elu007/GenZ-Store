import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const AddProduct = () => {

  const initialData = {
    title: "",
    imageUrl: "",
    price: "",
    description: "",
    category: "",
    rating: "",
  }
  const [productData, setProductData] = useState(initialData);

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/products/add', productData);
      console.log('Product added:', response.data);
      // Optionally, you can redirect the user or show a success message.
      setProductData(initialData);
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error, show an error message, etc.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <Container>

      <FormContainer>
        <h3>Add Product</h3>
        <InputContainer>
          <p>Title</p>
          <input type="text" name='title' value={productData.title} onChange={handleInputChange}/>
        </InputContainer>
        <InputContainer>
          <p>Image URL</p>
          <input type="text" name='imageUrl' value={productData.imageUrl} onChange={handleInputChange}/>
        </InputContainer>
        <InputContainer>
          <p>Price</p>
          <input type="number" name='price' value={productData.price} onChange={handleInputChange}/>
        </InputContainer>
        <InputContainer>
          <p>Description</p>
          <input type="text" name='description' value={productData.description} onChange={handleInputChange}/>
        </InputContainer>
        <InputContainer>
          <p>Category</p>
          <input type="text" name='category' value={productData.category} onChange={handleInputChange}/>
        </InputContainer>
        <InputContainer>
          <p>Rating</p>
          <input type="number" name='rating' value={productData.rating} onChange={handleInputChange}/>
        </InputContainer>
        <Button onClick={addProduct}>
          Add Product
        </Button>
      </FormContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 40%;
  min-width: 450px;
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;

  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-self: flex-start;

    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;

    &:hover {
      border: 1px solid blue;
    }
  }
`;

const Button = styled.button`
  width: 70%;
  height: 35px;
  color: white;
  background-color: black;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
`;

export default AddProduct
