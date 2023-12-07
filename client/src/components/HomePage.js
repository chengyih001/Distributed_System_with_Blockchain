import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const TopBar = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoginSignupButton = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid white;
  border-radius: 4px;
`;

const HomePage = () => {
  return (
    <Container>
      <TopBar>
        <div>Logo</div>
        <LoginSignupButton to="/signin">Login / Sign Up</LoginSignupButton>
      </TopBar>
      <h1>Product Preview</h1>
      {/* TODO: Add website info */}
    </Container>
  );
};

export default HomePage;
