package com.sqs_maier;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SqsMaierApplicationTests {

    @Test
    public void mainMethodRunsSuccessfully() throws InterruptedException {

        SqsMaierApplication.main(new String[] {});

        assertTrue(true);
    }
}
