package com.ece1724g2.userapiserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ece1724g2.userapiserver.entity.UserInfo;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, String> {
    Optional<UserInfo> findByEmail(String email);
    Optional<UserInfo> findByName(String name);
}
