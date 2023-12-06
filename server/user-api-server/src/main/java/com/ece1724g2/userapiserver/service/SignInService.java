package com.ece1724g2.userapiserver.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ece1724g2.userapiserver.entity.UserAuth;
import com.ece1724g2.userapiserver.repository.UserAuthRepository;

import jakarta.transaction.Transactional;

@Service
public class SignInService {
    
    private final UserAuthRepository userAuthRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public SignInService(UserAuthRepository userAuthRepo, BCryptPasswordEncoder passwordEncoder) {
        this.userAuthRepo = userAuthRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public String signIn(String email, String password) {
        if (!userAuthRepo.findByEmail(email).isPresent()) {
            throw new RuntimeException("User not found");
        }

        UserAuth userAuth = userAuthRepo.findByEmail(email).get();

        if (passwordEncoder.matches(password, userAuth.getPassword())) {
            // TODO: Login Page
            return userAuth.getId();
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
