import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const API_USER_INFO_SERVER = "http://localhost:8080" + "/api/user/info";
const API_USER_CONTRACT_SERVER = "http://localhost:8080" + "/contract/contract";
const API_USER__SIGNCONTRACT_SERVER =
  "http://localhost:8080" + "/contract/sign_contract";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const UserDetailsCard = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const SignButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ContractsCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserDetailItem = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Value = styled.div`
  font-size: 16px;
`;

const SwitchAuthMode = styled(Link)`
  color: #333;
  cursor: pointer;
  margin-top: 30px;
  display: inline-block;
`;

const UserDetailsPage = () => {
  const location = useLocation();
  const user_id = new URLSearchParams(location.search).get("user_id");

  const [userInfo, setUserInfo] = useState(null);
  const [contracts, setContracts] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${API_USER_INFO_SERVER}?user_id=${user_id}`,
          {
            method: "GET",
            headers: {
              user_id: user_id,
              Content_Type: "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setUserInfo({
            user_id: data.user_id,
            name: data.name,
            email: data.email,
          });
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error during user information fetch: ", error);
      }
    };

    const fetchUserContract = async () => {
      try {
        const response = await fetch(
          `${API_USER_CONTRACT_SERVER}?user_id=${user_id}`,
          {
            method: "GET",
            headers: {
              user_id: user_id,
              Content_Type: "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setContracts(data);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error during user information fetch: ", error);
      }
    };
    fetchUserContract();
    fetchUserInfo();
  }, [user_id]);
  const RenderingArrayOfObjects = (data) => {
    if (data.data != null) {
      const listItems = data.data.map((element) => {
        return (
          <ContractsCard>
            <UserDetailItem>
              <Label>Contract ID:</Label>
              <Value>{element.contractId}</Value>
            </UserDetailItem>
            <UserDetailItem>
              <Label>Signer ID:</Label>
              <Value>{element.signerId}</Value>
            </UserDetailItem>
            <UserDetailItem>
              <Label>Signee ID:</Label>
              <Value>{element.signeeId}</Value>
            </UserDetailItem>
            <UserDetailItem>
              <Label>Created Time:</Label>
              <Value>{element.createdTime}</Value>
            </UserDetailItem>
            <UserDetailItem>
              <Label>Signed Time:</Label>
              <Value>{element.signedTime}</Value>
            </UserDetailItem>
            <UserDetailItem>
              <Label>Content:</Label>
              <Value>{element.content}</Value>
            </UserDetailItem>
            <SignButton
              type="button"
              value={element.contractId}
              onClick={() => {
                handleSign(element.contractId);
              }}
            >
              Sign
            </SignButton>
          </ContractsCard>
        );
      });
      return <div>{listItems}</div>;
    }
  };
  const handleSign = async (props) => {
    try {
      const response = await fetch(
        `${API_USER__SIGNCONTRACT_SERVER}?contract_id=${props}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert(`Contract Signed`);
      } else {
        console.error("Failed to sign contract");
      }
    } catch (error) {
      console.error("Error during signing contract: ", error);
    }
  };

  return (
    <Container>
      <h1>User Info</h1>
      <UserDetailsCard>
        {userInfo ? (
          <>
            <UserDetailItem>
              <Label>ID:</Label>
              <Value>{userInfo.user_id}</Value>
            </UserDetailItem>
            <UserDetailItem>
              <Label>Name:</Label>
              <Value>{userInfo.name}</Value>
            </UserDetailItem>
            <UserDetailItem>
              <Label>Email:</Label>
              <Value>{userInfo.email}</Value>
            </UserDetailItem>
          </>
        ) : (
          <p>Loading user information...</p>
        )}
      </UserDetailsCard>
      <h1>Contracts</h1>
      <RenderingArrayOfObjects data={contracts} />
      <SwitchAuthMode to={`/contract/construct?user_id=${user_id}`}>
        Create Contract
      </SwitchAuthMode>
    </Container>
  );
};

export default UserDetailsPage;
