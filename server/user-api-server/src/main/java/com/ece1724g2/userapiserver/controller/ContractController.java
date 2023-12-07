package com.ece1724g2.userapiserver.controller;

import com.ece1724g2.userapiserver.dto.ContractRequest;
import com.ece1724g2.userapiserver.dto.SignInRequest;
import com.ece1724g2.userapiserver.dto.SignUpRequest;
import com.ece1724g2.userapiserver.entity.Contract;
import com.ece1724g2.userapiserver.service.ContractService;
import com.ece1724g2.userapiserver.service.SignInService;
import com.ece1724g2.userapiserver.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/contract")
public class ContractController {

    @Autowired
    private ContractService contractService;


    @PostMapping("/create_contract")
    public ResponseEntity<Map<String, Object>> createContract(@RequestBody ContractRequest contractRequest) {

        contractService.createContract(contractRequest.signer_id(), contractRequest.signee_id(), contractRequest.content());

        Map<String, Object> response = new HashMap<>();
        response.put("user_id", contractRequest.signer_id());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/contract")
    public ResponseEntity<List<Contract>> getContract(@RequestParam String user_id) {

        return ResponseEntity.ok(contractService.getContract(user_id));
    }

    @PostMapping("/sign_contract")
    public ResponseEntity<String> signContract(@RequestParam String contract_id) {

        contractService.signContract(contract_id);


        return ResponseEntity.ok(contract_id);
    }
}