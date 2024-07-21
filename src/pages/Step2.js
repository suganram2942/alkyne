import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/footer';
import logoIcon from '../assets/Logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
/* Loader CSS */
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #000;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;

const Content = styled.div`
  flex: 1;
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
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 40%;
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
  margin-top: -15px;
  margin-bottom: 15px;
  font-size: 12px;
`;

const Step2 = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state || { email: '' };
  console.log("Data check", email);

  const loginAndFetchData = () => {
    return new Promise((resolve, reject) => {
      axios.post(
        'https://untitled-twkmuar27a-uc.a.run.app/api/login/',
        {
          "username": email,
          "password": password
        },
      )
        .then(loginResponse => {
          const token = loginResponse.data.token;

          return axios.get('https://untitled-twkmuar27a-uc.a.run.app/api', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
          reject(error);
        });
    });
  };

  const handleContinue = async () => {
    if (!password) {
      setError('Password is required');
      return;
    }

    setError('');

    try {
      setIsLoading(true)
      const result = await loginAndFetchData();
      setIsLoading(false)
      navigate('/dashboard', { state: { data: result,email:email } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <Content>
        <Box>
          <img src={logoIcon} alt="Logo" />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '40%' }}>
              <div>STEP 2</div>
              <Title>Create an account to continue</Title>
              <div style={{ fontWeight: '600', lineHeight: '18px' }}>
                You’ll be able to log in to Dingoo with this email address and password.
              </div>
            </div>
            <div style={{ position: 'relative', width: '40%' }}>
              <div>Enter a password to create your account with</div>
              <Input
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {
                isLoading ? (
                  <div className="loader" style={{ position: 'absolute', right: 0 }}></div>
                ) : (
                  <Button style={{ position: 'absolute', right: 0 }} onClick={handleContinue}>
                    Agree & Continue
                  </Button>
                )
              }
              <div style={{ marginTop: '4px', width: '300px' }}>
                Use a minimum of 6 characters (case sensitive) with at least one number or special character.
              </div>
            </div>
          </div>
          <div style={{ marginTop: '42px' }}>
            Dingoo will use your data to personalise and improve your Dingoo experience and to send you information about Dingoo.
            You can change your communication preferences anytime. We may use your data as described in our Privacy Policy, including sharing it with The Test of Companies. By clicking "Agree & Continue", you agree to our Subscriber Agreement and acknowledge that you have read our Privacy Policy and Collection Statement.
          </div>
        </Box>
      </Content>
      <Footer />
    </Container>
  );
};

export default Step2;
