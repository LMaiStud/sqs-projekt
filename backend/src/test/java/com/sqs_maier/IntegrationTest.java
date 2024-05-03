package com.sqs_maier;

import com.sqs_maier.service.DataService;
import com.sqs_maier.util.Autobahn;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = Replace.NONE)
@TestPropertySource(locations = "classpath:application.properties")

public class IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DataService dataService;

    @Test
    public void testGetDataEndpointAndDatabase() throws Exception {
        Autobahn[] autobahns = Autobahn.values();
        autobahns = Arrays.stream(autobahns)
                .filter(autobahn -> !autobahn.equals(Autobahn.UNKNOWN))
                .toArray(Autobahn[]::new);

        List<String> apiResponses = getAllResponses(autobahns);

        for (int index = 0; index < autobahns.length; index++) {
            String currentResponse = apiResponses.get(index);

            String responseFromMockMvc = mockMvc.perform(MockMvcRequestBuilders.get("/roadworks")
                            .param("roadId", autobahns[index].toString())
                            .contentType(MediaType.APPLICATION_JSON))
                    .andReturn().getResponse().getContentAsString();

            assertTrue(apiResponses.contains(responseFromMockMvc));
        }




    }

    public List<String> getAllResponses(Autobahn[] autobahns){
        List<String> apiResponses = new ArrayList<>();

        for (Autobahn autobahn : autobahns) {
            String apiUrl = "https://verkehr.autobahn.de/o/autobahn/" + autobahn + "/services/roadworks";
            try {
                // API-Aufruf
                URL url = new URL(apiUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                // Lese die API-Antwort
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                // Füge die API-Antwort zur ArrayList hinzu
                apiResponses.add(response.toString());
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        return apiResponses;
    }
}
