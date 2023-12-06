-- Active: 1701466337098@@127.0.0.1@3306
CREATE DATABASE IF NOT EXISTS app_user;

USE app_user;

CREATE TABLE IF NOT EXISTS user_info (
    user_id VARCHAR(36) PRIMARY KEY,
    partner_id VARCHAR(36) NOT NULL,
    name CHAR(255) NOT NULL,
    email CHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_auth (
    user_id VARCHAR(36) PRIMARY KEY,
    email CHAR(255) UNIQUE NOT NULL,
    password CHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_info(user_id),
    FOREIGN KEY (email) REFERENCES user_info(email)
);


