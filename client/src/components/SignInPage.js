import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const API_SIGNIN_SERVER = "http://localhost:8080" + "/api/auth/signin";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Card = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AuthForm = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const SwitchAuthMode = styled(Link)`
  color: #333;
  text-decoration: none;
  margin-top: 30px;
  display: inline-block;
`;

const SignInPage = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_SIGNIN_SERVER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const user_id = data.user_id;

        console.log("User signed successfully with ID:", user_id);
        history.push(`/user?user_id=${user_id}`);
      } else {
        console.error("Failed to sign in user");
      }
    } catch (error) {
      console.error("Error during Sign in: ", error);
    }
  };

  return (
    <Container>
      <h1>Sign In</h1>
      <Card>
        <AuthForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleEmailChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handlePasswordChange}
            />
          </FormGroup>
          <SubmitButton type="submit">Sign In</SubmitButton>
        </AuthForm>
        <SwitchAuthMode to="/signup">
          Don't have an account? Sign Up
        </SwitchAuthMode>
      </Card>
    </Container>
  );
};

export default SignInPage;
