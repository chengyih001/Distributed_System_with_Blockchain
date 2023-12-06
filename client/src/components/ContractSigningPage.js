import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    padding: 20px;
`;

const ContractForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const SignatureInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
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

const SubmitButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ContractSigningPage = () => {
    const [signature, setSignature] = useState('');
    const [isSigned, setIsSigned] = useState(false);

    const handleSign = () => {
        if (signature.trim() !== '') {
            setIsSigned(true);
        } else {
            alert('Please enter yoru full name as the signature.');  
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle signed logic
    };

    return (
        <Container>
            <h1>Contract Signing</h1>
            <ContractForm onSubmit={handleSubmit}>
                {!isSigned ? (
                    <>
                        <SignatureInput
                            type="text"
                            placeholder="Enter your full name as the signature"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                        />
                        <SignButton type="button" onClick={handleSign}>
                            Sign Contract
                        </SignButton>
                    </>
                ) : (
                    <>
                        <p>Contract signed successfully!</p>
                        <SubmitButton type="submit" disabled={!isSigned}>
                            Submit Contract
                        </SubmitButton>
                    </>
                )}
            </ContractForm>
        </Container>
    );
};

export default ContractSigningPage;