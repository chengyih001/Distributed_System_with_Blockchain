package com.ece1724g2.userapiserver.service;

import org.springframework.stereotype.Service;

import com.ece1724g2.userapiserver.entity.User;
import com.ece1724g2.userapiserver.repository.UserAuthRepository;
import com.ece1724g2.userapiserver.repository.UserInfoRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.UUID;
import jakarta.transaction.Transactional;

@Service
public class SignUpService {
    
    private final UserInfoRepository userInfoRepo;
    private final UserAuthRepository userAuthRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public SignUpService(UserInfoRepository userInfoRepo, UserAuthRepository userAuthRepo, BCryptPasswordEncoder passwordEncoder) {
        this.userInfoRepo = userInfoRepo;
        this.userAuthRepo = userAuthRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public String signUp(String name, String email, String password) {
        // TODO: Return meaningful response
        if (userInfoRepo.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already taken");
        }
        
        UUID user_id = UUID.randomUUID();
        String hashed_password = passwordEncoder.encode(password);
        User user = new User(user_id.toString(), name, email, hashed_password);
        
        // System.out.println(user.getUserInfo().toString());
        // System.out.println(user.getUserAuth().toString());
        userInfoRepo.save(user.getUserInfo());
        userAuthRepo.save(user.getUserAuth());

        return user_id.toString();
    }
}
