import React, { useState } from 'react';
// import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useStateValue } from '../StateProvider';
import toast from 'react-hot-toast';

const baseURL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [{ basket }, dispatch] = useStateValue();

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      toast.error("Invalid Credentials 🙄")
    } else {
      dispatch({ type: "USER", payload: true })
      toast.success('Successfully logged in 😃!')
      navigate("/");
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    }

  };
  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src="/images/storelogo.svg" alt="Logo" />
      </Logo>

      <FormContainer method='POST'>
        <h3>Sign-In</h3>

        <InputContainer>
          <p>Email</p>
          <input
            type="email" name='email'
            placeholder="example@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password" name='password'
            placeholder="********"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>

        <LoginButton onClick={login}>Login</LoginButton>

        <InfoText>
          By continuing, you agree to GenZ Store's <span>Conditions of Use </span>
          and <span> Privacy Notice</span>
        </InfoText>
      </FormContainer>
      <SignUpButton onClick={() => navigate(`${baseURL}/signup`)}>
        Create Account in GenZ Store
      </SignUpButton>
    </Container>
  );
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

const LoginButton = styled.button`
  width: 70%;
  height: 35px;
  color: white;
  background-color: #007bff;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
`;

const InfoText = styled.p`
  font-size: 12px;
  width: 100%;
  word-wrap: normal;
  word-break: normal;
  margin-top: 20px;

  span {
    color: #426bc0;
  }
`;

const SignUpButton = styled.button`
  width: 55%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;

  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;

export default Login
