import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import contract from "../contract/contract";

const API_USER_CONTRACT_SERVER =
  "http://localhost:8080" + "/contract/create_contract";

const API_USER_INFO_SERVER = "http://localhost:8080" + "/api/user/info";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const ContractForm = styled.form`
  max-width: 1000px;
  margin: 0 auto;
`;

const PartnerInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ContractInput = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  height: 300px;
`;

const FindButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

const InviteButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ContractConstructPage = () => {
  const location = useLocation();
  const user_id = new URLSearchParams(location.search).get("user_id");

  const [userContract, setUserContract] = useState(contract);
  const [userToInvite, setUserToInvite] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  const handleSearch = async () => {
    const user = await searchForPartner(userToInvite);

    if (user) {
      setFoundUser({
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      });
    } else {
      alert("User not found.");
    }
  };

  const handleInvite = async () => {
    try {
      const response = await fetch(`${API_USER_CONTRACT_SERVER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signee_id: foundUser.user_id,
          content: userContract,
          signer_id: user_id,
        }),
      });

      if (response.ok) {
        alert(`Invitation sent to ${foundUser.name} (${foundUser.email})`);
      } else {
        console.error("Failed to sent contract");
      }
    } catch (error) {
      console.error("Error during senting contract: ", error);
    }
  };

  const searchForPartner = async () => {
    try {
      const response = await fetch(
        `${API_USER_INFO_SERVER}?email=${userToInvite}`,
        {
          method: "GET",
          headers: {
            Content_Type: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          user_id: data.user_id,
          name: data.name,
          email: data.email,
        };
      } else {
        console.error("Failed to fetch user information");
      }
    } catch (error) {
      console.error("Error during user information fetch: ", error);
    }
  };

  return (
    <Container>
      <h1>Create Contract</h1>
      <ContractForm>
        <ContractInput
          type="text"
          placeholder="Enter User email to Find and Invite"
          value={contract}
          onChange={(e) => setUserContract(e.target.value)}
        />
        {!foundUser ? (
          <>
            <PartnerInput
              type="text"
              placeholder="Enter User email to Find and Invite"
              value={userToInvite}
              onChange={(e) => setUserToInvite(e.target.value)}
            />
            <FindButton type="button" onClick={handleSearch}>
              Search
            </FindButton>
          </>
        ) : (
          <>
            <UserDetailsCard>
              <p>User Found:</p>
              <UserDetailItem>
                <Label>ID:</Label>
                <Value>{foundUser.user_id}</Value>
              </UserDetailItem>
              <UserDetailItem>
                <Label>Name:</Label>
                <Value>{foundUser.name}</Value>
              </UserDetailItem>
              <UserDetailItem>
                <Label>Email:</Label>
                <Value>{foundUser.email}</Value>
              </UserDetailItem>
            </UserDetailsCard>
            <InviteButton type="button" onClick={handleInvite}>
              Send Invitation
            </InviteButton>
          </>
        )}
      </ContractForm>
    </Container>
  );
};

export default ContractConstructPage;
