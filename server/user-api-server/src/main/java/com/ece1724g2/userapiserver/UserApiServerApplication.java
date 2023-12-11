package com.ece1724g2.userapiserver;

import com.bigchaindb.builders.BigchainDbConfigBuilder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserApiServerApplication {

    static final String bigchainDbURL = "http://34.227.223.5:9984/";

    public static void main(String[] args) {

        BigchainDbConfigBuilder.baseUrl(bigchainDbURL).setup();

        SpringApplication.run(UserApiServerApplication.class, args);
    }

}
