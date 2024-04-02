package com.sqs_maier.controller;

import com.sqs_maier.service.DataService;
import com.sqs_maier.util.Autobahn;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ApiController.class)
@AutoConfigureMockMvc
class ApiControllerTest {

    @MockBean
    private DataService dataService;

    @Autowired
    private ApiController apiController;

    @Test
    void getData_withUnknownRoadId_shouldReturnNotFound() throws IOException {
        // Arrange
        String unknownRoadId = "unknown";
        when(dataService.getData(Autobahn.UNKNOWN)).thenReturn(ResponseEntity.ok("Some data")); // Mock dataService response

        // Act
        ResponseEntity<String> response = apiController.getData(unknownRoadId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }


}
