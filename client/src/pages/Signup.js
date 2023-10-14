import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", password: "", cpassword: ""
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }

  const signup = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = user;

    try {
      const response = await axios.post(`https://genzstore.onrender.com/signup`, {
        name,
        email,
        password,
        cpassword,
      });

      if (response.status === 201) {
        toast.success('Successfully Registered 😎!')
        console.log('Registration successful');

        navigate('/login');
      } else {
        toast.error("Something didn't work 😮!")
        console.log('Registration unsuccessful');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error("Registration failed 😮!")
    }
  }

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="/images/storelogo.svg" alt="logo" />
      </Logo>
      <FormContainer method='POST'>
        <h3>Sign-Up</h3>
        <InputContainer>
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Bhuvan Bam"
            onChange={handleInputs} name='name' value={user.name}
          />
        </InputContainer>
        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={handleInputs} name='email' value={user.email}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={handleInputs} name='password' value={user.password}
          />
        </InputContainer>
        <InputContainer>
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={handleInputs} name='cpassword' value={user.cpassword}
          />
        </InputContainer>

        <SignUpButton onClick={signup}>Create Account in GenZ Store</SignUpButton>
      </FormContainer>

      <LoginButton onClick={() => navigate("/login")}>
        Back to Login
      </LoginButton>
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

const Logo = styled.div`
  width: 60px;
  background-color: black;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  height: 400px;
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
      border: 1px solid orange;
    }
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;

const LoginButton = styled.button`
  width: 55%;
  height: 35px;
  color: white;
  background-color: #007bff;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
`;

export default Signup
