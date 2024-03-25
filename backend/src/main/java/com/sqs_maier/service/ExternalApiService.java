package com.sqs_maier.service;

import com.sqs_maier.util.Autobahn;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class ExternalApiService {

    @Value("${external.api.baseurl}")
    private String baseUrl;

    public String fetchDataFromExternalAPI(Autobahn autobahn) throws IOException {
        String output = "";
        URL urlForGetRequest = new URL(baseUrl + "/o/autobahn/" + autobahn + "/services/roadworks");
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
        } else {
            throw new IOException("Failed to fetch data from external API: HTTP error code " + responseCode);
        }
        return output;
    }
}
