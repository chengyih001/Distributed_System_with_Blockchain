package com.ece1724g2.userapiserver.dto;

public class SignUpRequest {
    private String name;
    private String email;
    private String password;

    public SignUpRequest(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Getters
    public String getName() {
        return name;
    }
    
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
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
                "name=" + name +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
