package com.ece1724g2.userapiserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ece1724g2.userapiserver.entity.UserAuth;

import java.util.Optional;

public interface UserAuthRepository extends JpaRepository<UserAuth, String> {
    Optional<UserAuth> findByEmail(String email);
}
