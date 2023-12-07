package com.ece1724g2.userapiserver.repository;

import com.ece1724g2.userapiserver.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, String> {
    List<Contract> findBySignerId(String signerId);
    List<Contract> findBySigneeId(String signeeId);
}
