package com.sqs_maier.service;

import com.sqs_maier.util.Autobahn;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

class ExternalApiServiceTest {

    @Test
    void testDataFieldwitheExistingRoad() throws IOException {
        // Arrange
        ExternalApiService test = new ExternalApiService();
        test.baseUrl = "https://verkehr.autobahn.de/";
        Autobahn autobahn = Autobahn.A1;


        // Act

        //get Body withe simple request
        String output = "";
        URL urlForGetRequest = new URL("https://verkehr.autobahn.de/" + "/o/autobahn/" + autobahn + "/services/roadworks");
        HttpURLConnection connection = (HttpURLConnection) urlForGetRequest.openConnection();
        connection.setRequestMethod("GET");
        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            try (BufferedReader in = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()))) {
                StringBuilder response = new StringBuilder();
                String readLine;
                while ((readLine = in.readLine()) != null) {
                    response.append(readLine);
                }
                output = response.toString();
            }
        }

        //get body withe ExternalApiService
        String testData = test.fetchDataFromExternalAPI(autobahn);

        // Assert
        // if body is the same
        assertEquals(testData, output);
    }

    @Test
    void testDataFieldwitheNonExistingRoad() {
        // Arrange
        ExternalApiService test = new ExternalApiService();
        Autobahn autobahn = Autobahn.A1;

        //a URL to Fail
        test.baseUrl = "https://verkehr.autobahn.de/2/";



        // Act
        assertThrows(IOException.class, () -> {
            test.fetchDataFromExternalAPI(autobahn);
        });

    }

}
