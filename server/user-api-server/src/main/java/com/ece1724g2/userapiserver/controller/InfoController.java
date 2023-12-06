package com.ece1724g2.userapiserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ece1724g2.userapiserver.service.UserInfoService;

import java.util.Map;
import java.util.HashMap;

import com.ece1724g2.userapiserver.entity.UserInfo;

@RestController
@RequestMapping("/api/user")
public class InfoController {
    
    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getUserInfo(@RequestParam String user_id) {
        System.out.println(user_id);

        UserInfo userInfo = userInfoService.getUserInfoById(user_id);

        if (userInfo != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("user_id", userInfo.getId());
            response.put("partner_id", userInfo.getPartner());
            response.put("name", userInfo.getName());
            response.put("email", userInfo.getEmail());
    
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
