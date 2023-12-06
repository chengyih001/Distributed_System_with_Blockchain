package com.ece1724g2.userapiserver.service;

import org.springframework.stereotype.Service;

import com.ece1724g2.userapiserver.entity.UserInfo;
import com.ece1724g2.userapiserver.repository.UserInfoRepository;

import jakarta.transaction.Transactional;

@Service
public class UserInfoService {
    
    private final UserInfoRepository userInfoRepo;

    public UserInfoService(UserInfoRepository userInfoRepo) {
        this.userInfoRepo = userInfoRepo;
    }

    @Transactional
    public UserInfo getUserInfoById(String user_id) {
        return userInfoRepo.findById(user_id).get();
    }
}
