package com.ece1724g2.userapiserver.service;

import com.bigchaindb.builders.BigchainDbTransactionBuilder;
import com.bigchaindb.constants.Operations;
import com.bigchaindb.model.Transaction;
import com.ece1724g2.userapiserver.entity.Contract;
import com.ece1724g2.userapiserver.repository.ContractRepository;
import jakarta.transaction.Transactional;
import net.i2p.crypto.eddsa.EdDSAPrivateKey;
import net.i2p.crypto.eddsa.EdDSAPublicKey;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.KeyPair;
import java.util.*;


@Service
public class ContractService {

    private final ContractRepository contractRepo;


    public ContractService(ContractRepository contractRepo) {

        this.contractRepo = contractRepo;
    }

    @Transactional
    public void createContract(String signer_id, String signee_id, String content) {
        UUID contract_id = UUID.randomUUID();
        Contract contract = new Contract(contract_id.toString(), signer_id, signee_id, content);
        contractRepo.save(contract);

    }

    @Transactional
    public List<Contract> getContract(String user_id) {
        List<Contract> contracts = contractRepo.findBySignerId(user_id);
        contracts.addAll(contractRepo.findBySigneeId(user_id));
        return contracts;
    }

    @Transactional
    public void signContract(String contract_id) {
        Contract contract = contractRepo.findById(contract_id).get();
        contract.setSignedTime();
        contractRepo.save(contract);

        net.i2p.crypto.eddsa.KeyPairGenerator edDsaKpg = new net.i2p.crypto.eddsa.KeyPairGenerator();
        KeyPair keyPair = edDsaKpg.generateKeyPair();

        Map<String, Object> assetData = new TreeMap<String, Object>() {{
            put("contract", contract);
        }};

        try {
            Transaction transaction = BigchainDbTransactionBuilder
                    .init()
                    .addAssets(assetData, TreeMap.class)
                    .operation(Operations.CREATE)
                    .buildAndSign((EdDSAPublicKey) keyPair.getPublic(), (EdDSAPrivateKey) keyPair.getPrivate())
                    .sendTransaction();
            System.out.println(transaction.toString());

        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
