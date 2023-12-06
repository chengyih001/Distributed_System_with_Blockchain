import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const API_USER_INFO_SERVER = 'http://localhost:8080' + '/api/user/info';

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

const UserDetailItem = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

const Label = styled.div`
    font-weight:bold;
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
    const user_id = new URLSearchParams(location.search).get('user_id');

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async() => {
            try {
                const response = await fetch(`${API_USER_INFO_SERVER}?user_id=${user_id}`, {
                    method: 'GET',
                    headers: {
                        'user_id': user_id,
                        'Content_Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    setUserInfo({
                                    'user_id': data.user_id,
                                    'partner_id': data.partner_id,
                                    'name': data.name,
                                    'email': data.email
                                });
                } else {
                    console.error('Failed to fetch user information');
                }
            } catch (error) {
                console.error('Error during user information fetch: ', error);
            }
        };

        fetchUserInfo();
    }, [user_id]);

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
                            <Label>Partner:</Label>
                            <Value>{userInfo.partner_id}</Value>
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
            <SwitchAuthMode to="/contract/construct">Sign Contract</SwitchAuthMode>
        </Container>
    );
};

export default UserDetailsPage;