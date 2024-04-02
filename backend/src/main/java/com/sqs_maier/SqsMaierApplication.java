package com.sqs_maier;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.sqs_maier.controller", "com.sqs_maier.service", "com.sqs_maier.repository", "com.sqs_maier.model", "com.sqs_maier.repository"})
public class SqsMaierApplication {

    public static void main(String[] args) {

        SpringApplication.run(SqsMaierApplication.class, args);
    }

}