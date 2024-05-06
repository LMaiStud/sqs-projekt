package com.sqs_maier;

import com.sqs_maier.controller.ApiController;
import com.sqs_maier.util.Autobahn;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(locations = "classpath:application.properties")
class StressTest {

    @Test
    void stressTest() throws Exception {
        int numberOfConnections = 1000000;

        ApiController apiController = new ApiController(null);
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(apiController).build();

        ExecutorService executorService = Executors.newFixedThreadPool(10);

        Runnable stressTestTask = () -> {
            try {
                mockMvc.perform(MockMvcRequestBuilders.get("/roadworks")
                                .param("roadId", Autobahn.A3.toString())
                                .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk());
            } catch (Exception e) {
                e.printStackTrace();
            }
        };

        // Stress-Tests in Threads starten
        for (int i = 0; i < numberOfConnections; i++) {
            executorService.submit(stressTestTask);
        }

        executorService.shutdown();
    }

}
