import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import logoIcon from '../assets/Logo.png';

const Container = styled.div`
  height: 100vh;
`;

const Content = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const Box = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 60%;
  padding: 10px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: -10px;
  margin-bottom: 20px;
`;

const Step1 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === '') {
      setError('Email is required');
    } else {
      setError('');
      navigate('/step2', { state: { email: email } });
    }
  };

  return (
    <Container>
      <Content>
        <Box>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%' }}>
              <img src={logoIcon} alt="Logo" width={50} height={50} />
              <div>STEP 1</div>
              <Title>Enter your email address to continue</Title>
              <div>Log in to your account. If you don't have one, you will be prompted to create one.</div>
            </div>
          </div>
          <div style={{ alignSelf: 'center', width: '40%' }}>
            <form style={{ position: 'relative' }} onSubmit={handleSubmit}>
              <div>
                <label>Email</label>
                <Input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </div>
              <Button style={{ position: 'absolute', right: 0 }} type="submit">Continue</Button>
            </form>
          </div>
        </Box>
      </Content>
      <Footer />
    </Container>
  );
};

export default Step1;
