package com.ece1724g2.userapiserver.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class User {

    @Id
    private String user_id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserAuth userAuth;

    public User() {}

    public User(String user_id, String name, String email, String password) {
        this.userInfo = new UserInfo(user_id, name, email);
        this.userAuth = new UserAuth(user_id, email, password);
    }

    // Getters
    public String getId() {
        return user_id;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public UserAuth getUserAuth() {
        return userAuth;
    }

    // Setters
    public void setId(String user_id) {
        this.user_id = user_id;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public void setUserAuth(UserAuth userAuth) {
        this.userAuth = userAuth;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + user_id +
                ", userInfo=" + userInfo.toString() +
                ", userAuth=" + userAuth.toString() +
                '}';
    }
}
