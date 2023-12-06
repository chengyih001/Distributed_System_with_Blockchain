package com.ece1724g2.userapiserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ece1724g2.userapiserver.service.SignInService;
import com.ece1724g2.userapiserver.service.SignUpService;

import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

import com.ece1724g2.userapiserver.dto.SignUpRequest;
import com.ece1724g2.userapiserver.dto.SignInRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private SignUpService signUpService;
    @Autowired
    private SignInService signInService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody SignUpRequest signUpReqeust) {
        // System.out.println(signUpReqeust.toString());
        String user_id = signUpService.signUp(signUpReqeust.getName(), signUpReqeust.getEmail(), signUpReqeust.getPassword());

        Map<String, Object> response = new HashMap<>();
        response.put("user_id", user_id);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> signIn(@RequestBody SignInRequest signInRequest) {
        String user_id = signInService.signIn(signInRequest.getEmail(), signInRequest.getPassword());
        
        Map<String, Object> response = new HashMap<>();
        response.put("user_id", user_id);

        return ResponseEntity.ok(response);
    }
}