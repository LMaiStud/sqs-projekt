package com.sqs_maier;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SqsMaierApplicationTests {

    @Test
    void mainMethodRunsSuccessfully() {

        SqsMaierApplication.main(new String[] {});

        assertTrue(true);
    }
}
