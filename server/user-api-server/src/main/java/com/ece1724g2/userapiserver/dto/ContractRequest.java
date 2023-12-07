package com.ece1724g2.userapiserver.dto;

public record ContractRequest(String signer_id, String signee_id, String content) {
}
