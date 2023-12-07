package com.ece1724g2.userapiserver.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "contract")
@Getter
@Setter
public class Contract {

    @Id
    private String contractId;
    private String createdTime;
    private String signedTime;
    private String signerId;
    private String signeeId;
    private String content;

    public Contract() {
    }

    public Contract(String contract_id, String signer_id, String signee_id, String content) {
        this.contractId = contract_id;
        this.signerId = signer_id;
        this.signeeId = signee_id;
        this.content = content;
        this.createdTime = new Date().toString();
    }


    public void setSignerId(String signer) {
        this.signerId = signer;
    }
    public void setSignedTime(  ) {
        this.signedTime = new Date().toString();;
    }


    @Override
    public String toString() {
        return "Contract{" +
                "contract_id=" + contractId +
                ", signer_id='" + signerId + '\'' +
                ", created_time='" + createdTime + '\'' +
                ", signed_time='" + signedTime + '\'' +
                ", signee_id='" + signeeId + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
