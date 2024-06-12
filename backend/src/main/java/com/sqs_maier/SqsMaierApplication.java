package com.sqs_maier;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.sqs_maier.controller", "com.sqs_maier.service", "com.sqs_maier.repository", "com.sqs_maier.model", "com.sqs_maier.repository"})
@OpenAPIDefinition(
        info = @Info(
                title = "Highway Construction Sites API",
                version = "1.0",
                description = "This API allows retrieving construction sites on German highways."
        )
)
public class SqsMaierApplication {

    public static void main(String[] args) {
        SpringApplication.run(SqsMaierApplication.class, args);
    }

}