package com.ece1724g2.userapiserver;

import com.bigchaindb.builders.BigchainDbConfigBuilder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserApiServerApplication {

    public static void main(String[] args) {
        BigchainDbConfigBuilder.baseUrl("http://localhost:9984").setup();

        SpringApplication.run(UserApiServerApplication.class, args);
    }

}
