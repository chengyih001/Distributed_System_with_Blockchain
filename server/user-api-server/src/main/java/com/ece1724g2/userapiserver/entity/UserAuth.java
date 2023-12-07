package com.ece1724g2.userapiserver.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_auth")
public class UserAuth {
    
    @Id
    private String user_id;
    private String email;
    private String password;

    public UserAuth() {}

    public UserAuth(String user_id, String email, String password) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
    }

    // Getters
    public String getId() {
        return user_id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    // Setters
    public void setId(String id) {
        this.user_id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + user_id +
                ", email='" + email + '\'' +
                ", hashed_password='" + password + '\'' +
                '}';
    }
}
