-- Active: 1701965587696@@app-user-db.culhgdelj9hf.us-east-1.rds.amazonaws.com@3306@app_user
CREATE DATABASE IF NOT EXISTS app_user;

USE app_user;

CREATE TABLE IF NOT EXISTS user_info (
    user_id VARCHAR(36) PRIMARY KEY,
    partner_id VARCHAR(36) NOT NULL,
    name CHAR(255) NOT NULL,
    email CHAR(255) UNIQUE NOT NULL,
);

CREATE TABLE IF NOT EXISTS user_auth (
    user_id VARCHAR(36) PRIMARY KEY,
    email CHAR(255) UNIQUE NOT NULL,
    password CHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_info(user_id),
    FOREIGN KEY (email) REFERENCES user_info(email)
);

CREATE TABLE IF NOT EXISTS contract (
    contract_id VARCHAR(36) PRIMARY KEY,
    created_time CHAR(255) NOT NULL,
    signed_time CHAR(255),
    signer_id VARCHAR(36) NOT NULL,
    signee_id VARCHAR(36) NOT NULL,
    content VARCHAR(5000) NOT NULL,
    FOREIGN KEY (signer_id) REFERENCES user_info(user_id),
    FOREIGN KEY (signee_id) REFERENCES user_info(user_id)
);

